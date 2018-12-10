const passportController = require("../controllers/passport.controller");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const jwtConfig = require("../config/passport").JWT;
const localConfig = require("../config/passport").local;

passport.serializeUser(passportController.serializeUser);
passport.deserializeUser(passportController.deserializeUser);

var jwtStrategy = new JwtStrategy(jwtConfig, passportController.jwtStrategy);
var loginStrategy = new LocalStrategy(
  localConfig,
  passportController.loginStrategy
);
var signupStrategy = new LocalStrategy(
  localConfig,
  passportController.signupStrategy
);

passport.use("JWT", jwtStrategy);
passport.use("login", loginStrategy);
passport.use("signup", signupStrategy);

module.exports = passport;
