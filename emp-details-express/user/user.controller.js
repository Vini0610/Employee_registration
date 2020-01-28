let User = require('./user.dao');

exports.createUser = function(req, res, next){
    var user = {
        userName: req.body.userName,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password
    }
    User.create(user, function(err, user){
        if(err){
            res.json({
                error: err
            })
        }
        res.json({
            message: "User created successfully"
        })
    })
}

exports.getUser = function(req, res, next){
    User.get({}, function(err, users){
        if(err){
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

exports.getUserById =  function(req, res, next){
    User.get({ _id: req.params.id}, function(err, user){
        if(err){
            res.json({
                error: err
            })
        }
        res.json({
            user: user[0]
        })
    })
}

exports.removeUser = function(req, res, next) {
    User.delete({_id: req.params.id}, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
}