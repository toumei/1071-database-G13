var ExtractJwt = require("passport-jwt").ExtractJwt;
module.exports = {
  JWT: {
    secretOrKey: "secret",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  local: {
    usernameField: "id",
    passwordField: "password",
    passReqToCallback: true
  }
};
