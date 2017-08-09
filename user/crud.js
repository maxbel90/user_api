const UserModel = require('../lib/mongoose').UserModel;

const userCrud = {
    authenticate: function (req, res) {
        const dataToSeek = {
            email: req.body.email,
            password: req.body.password
        };

        return UserModel.find(dataToSeek, function (err, user) {

            if (!err && user.length) {
                if (!user.blocked) {
                    return res.send(user);
                } else {
                    return res.send({error: 'Forbidden'});
                }
            } else {
                res.statusCode = 403;
                return res.send({error: 'Forbidden'});
            }
        })

    },
    get: function (req, res) {
        return UserModel.find(function (err, users) {
            if (!err) {
                return res.send(users);
            } else {
                res.statusCode = 500;
                return res.send({error: 'Server error'});
            }
        });
    },
    getById: function (req, res) {
        return UserModel.findById(req.params.id, function (err, user) {
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            if (!err) {
                return res.send(user);
            } else {
                res.statusCode = 500;
                return res.send({error: 'Server error'});
            }
        });
    },
    save: function (req, res) {
        const user = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            createdOn: Date.now(),
            updatedOn: Date.now(),
            role: 'user',
        });

        user.save(function (err) {
            if (!err) {
                console.log("user created");
                return res.send(user);
            } else {
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                console.log('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    },

    updateUser: function (req, res) {
        return UserModel.findById(req.params.id, function (err, user) {
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }

            for (let index in req.body) {
                user[index] = req.body[index];
            }

            user.updatedOn = Date.now();

            return user.save(function (err) {
                if (!err) {
                    console.log("user updated");
                    return res.send(user);
                } else {
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                    }
                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        });
    },

    deleteUser: function (req, res) {
        return UserModel.findById(req.params.id, function (err, user) {
            console.log(user);
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            return user.remove(function (err) {
                if (!err) {
                    console.log("user removed");
                    return res.send({status: 'OK'});
                } else {
                    res.statusCode = 500;
                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({error: 'Server error'});
                }
            });
        });
    }

};

module.exports = userCrud;