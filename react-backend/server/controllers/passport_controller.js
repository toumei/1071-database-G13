const usersModel = require('../models/users_model');
var bcrypt = require('bcryptjs');

module.exports = {
    serializeUser: (user, done) => {
        done(null, user.id);
    },

    deserializeUser: (id, done) => {
        usersModel.fetchById(id)
        .then( ( [data] ) => {
            return done(null, data[0]);
        })
        .catch( err => console.log(err));
    },

    jwtStrategy: (jwt_payload, done) => {
        usersModel.fetchByEmail(jwt_payload.sub)
        .then( ( [data] ) => {
            if(!data)
                return done(null, false, {message: 'Wrong JWT Token'});
            return done(null, data[0]);
        })
        .catch( err => { return done(err); });
    },

    loginStrategy: (req, email, pwd, done) => {
        usersModel.fetchByEmail(email)
        .then( ( [data] ) => {
            if (!data.length)
                return done(null, false, {message: 'Email is not exists'});
            if (!bcrypt.compareSync(pwd, data[0].pwd)) 
                return done(null, false, {message: 'Invalid Password'});
            
            return done(null, data[0]);
        })
        .catch( err => { return done(err); });
    },

    signupStrategy: (req, email, pwd, done) => {
        usersModel.fetchByEmail(email)
        .then( ( [data] ) => {
            if (data.length) { return done(null, false, {message: 'Email Already Exists'}); 
            }else{
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    pwd: bcrypt.hashSync(req.body.pwd, 10)
                };
                return usersModel.insert(data);
            }
        })
        .then( ( [data] ) => {
            return done(null, data[0]);
        })
        .catch( err => { return done(err); });
    }
}
