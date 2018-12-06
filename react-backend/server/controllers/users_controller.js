const usersModel = require('../models/users_model');
var bcrypt = require('bcryptjs');
var path = 'database/userTable/';

module.exports = {
    getList: (req, res, next) => {
        usersModel.fetchAll()
        .then( ( [data] ) => {
            res.render(path + 'users', { title: 'User List', data: data });
        })
        .catch( err => console.log(err));
    },
    
    getSearch: (req, res, next) => {
        usersModel.fetchById(req.query.uid)
        .then( ( [data] ) => {
            res.render(path + 'usersSearch', { title: 'User Search', data: data });
        })
        .catch( err => console.log(err));
    },

    getEdit: (req, res, next) => {
        usersModel.fetchById(req.query.uid)
        .then( ( [data] ) => {
            res.render(path + 'userEdit', { title: 'User Edit', data: data });
        })
        .catch( err => console.log(err));
    },

    postUpdate: (req, res, next) => {
        var sqlData = {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            pwd: bcrypt.hashSync(req.body.pwd, 10)
        };
        usersModel.update(sqlData, req.body.uid)
        .then( () => {
            res.redirect('/users');
        })
        .catch( err => console.log(err));
    },

    getDelete: (req, res, next) => {
        usersModel.delete(req.query.uid)
        .then( () => {
            res.redirect('/users');
        })
        .catch( err => console.log(err));
    },

    getAdd: (req, res, next) => {
        res.render(path + 'userAdd', { title: 'Add User', msg: '' });
    },
    
    postAdd: (req, res, next) => {
        var sqlData = {
            name: req.body.name,
            email: req.body.email,
            pwd: bcrypt.hashSync(req.body.pwd, 10)
        };
        usersModel.insert(sqlData)
        .then( () => {
            res.redirect('/users');
        })
        .catch( err => console.log(err));
    },
};
