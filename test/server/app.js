var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const epilogue = require("epilogue");
const database = require("./config/mysql");

const acl = require("express-acl");
const aclConfig = require("./config/acl");

var passport = require("passport");
const expressJwt = require("express-jwt");
const jwtConfig = require("./config/passport").JWT;

var indexRouter = require("./routes/index");
var boarderRouter = require("./routes/boarder");

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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set header
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// set jwt auth
app.use(
  expressJwt({ secret: jwtConfig.secretOrKey }).unless({
    path: ["/api/", "/api/login", "/api/sigup"]
  })
);

// set acl auth
app.use(acl.authorize.unless({ path: ["/api/", "/api/login", "/api/sigup"] }));

//set CRUD router
require("./routes/CRUD");
app.use("/api/", indexRouter);
app.use("/api/boarder", boarderRouter);

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
