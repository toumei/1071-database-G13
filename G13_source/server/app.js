var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// logger
var logger = require("morgan");
var FileStreamRotator = require("file-stream-rotator");
var fs = require("fs");
// DB
const epilogue = require("epilogue");
const database = require("./config/mysql");
// ACL
const acl = require("express-acl");
const aclConfig = require("./config/acl");

var passport = require("passport");
const expressJwt = require("express-jwt");
const jwtConfig = require("./config/passport").JWT;
// API
var moment = require("moment");
const cryptModel = require("./models/crypt.model");

// Router
var indexRouter = require("./routes/index");
var databaseRouter = require("./routes/database");
var malfunctionRouter = require("./routes/malfunction");
var processingRouter = require("./routes/processing");

var app = express();

// initialize database
epilogue.initialize({
  app: app,
  sequelize: database
});

// set ACL
acl.config(aclConfig);
// set passport
require("./config/passport-strategy");

// view engine setup
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// logger
var logDirectory = path.join(__dirname, "log");
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: "YYYYMMDD",
  filename: path.join(logDirectory, "access-%DATE%.log"),
  frequency: "daily",
  verbose: false
});
//set logger
app.use(logger("tiny", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set Header
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// set jwt auth
// app.use(
//   expressJwt({ secret: jwtConfig.secretOrKey }).unless({
//     path: ["/api/", "/api/login", "/api/sigup"]
//   })
// );

// set acl auth
// app.use(acl.authorize.unless({ path: ["/api/", "/api/login", "/api/sigup"] }));

var nonceArr = {};
var clearTime = moment().unix();
app.use(function(req, res, next) {
  console.log(nonceArr);
  // clear nonce
  if (moment().unix() - clearTime > 60) {
    clearTime = moment().unix();
    for (var key in nonceArr) {
      if (moment().unix() - nonceArr[key] > 60) {
        delete nonceArr[key];
      }
    }
  }

  if (req.method == "GET") {
    var url = req.path;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var sign = req.query.sign;
  } else if (
    req.method == "POST" ||
    req.method == "PUT" ||
    req.method == "DELETE"
  ) {
    var url = req.path;
    var timestamp = req.body.timestamp;
    var nonce = req.body.nonce;
    var sign = req.body.sign;
  }

  if (
    cryptModel.md5({
      url: url,
      timestamp: timestamp,
      nonce: nonce
    }) != sign
  ) {
    res.status(500).send('sign error!');
  } else if (moment().unix() - timestamp > 60) {
    res.status(500).send('timestamp error!');
  } else if (nonceArr.hasOwnProperty(nonce)) {
    res.status(500).send('repeat error!');
  } else {
    nonceArr[nonce] = timestamp;
    next();
  }
});

//set CRUD router
//require("./routes/CRUD");
// Router Path
app.use("/api/", indexRouter);
app.use("/api/database", databaseRouter);
app.use("/api/malfunction", malfunctionRouter);
app.use("/api/processing", processingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
