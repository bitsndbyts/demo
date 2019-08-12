const async = require('async');
const bcrypt = require('bcrypt');
const {userFindOne, userInsertOne, userUpdateOne, userDeleteOne} = require('../dbos/user.dbos');
const {getToken, verifyToken} = require('../helpers/jwt');
const {activateSendMail, orderSendMail} = require('../helpers/mail');

const getUser = (req, res) => {
    userFindOne({"id": req.query.id}, (error, data) => {
        if (error) {
            console.log(error);
            res.send(error)
        } else if (data) {
            console.log("Found results");
            res.send(data)
        } else {
            res.send("No user records found")
        }
    })
};

const registerUser = (req, res) => {
    async.waterfall([
            (next) => {
                userFindOne({"id": req.body.id}, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else if (data) {
                        if (data.status === "REGISTER") {
                            next("Please activate your account", null)
                        } else {
                            next({"error": "user id already exist"}, null)
                        }
                    } else {
                        next(null)
                    }
                });
            },
            (next) => {
                userFindOne({"email": req.body.email}, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else if (data) {
                        if (data.status === "REGISTER") {
                            next("Please activate your account", null)
                        } else {
                            next({"error": "email id already exist"}, null)
                        }
                    } else {
                        next(null)
                    }
                });
            },
            (next) => {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                const user = {
                    "id": req.body.id,
                    "name": req.body.name,
                    "email": req.body.email,
                    "password": req.body.password,
                    "status": "REGISTER",
                };
                userInsertOne(user, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else {
                        next(null, data)
                    }
                })
            },
            (data, next) => {
                const payload = {
                    "id": data.id,
                    "email": data.email,
                    "name": data.name,
                };
                getToken(payload, "rgukt123", {expiresIn: 60 * 60}, (error, token) => {
                    if (error) {
                        next(error, null)
                    } else {
                        next(null, token, data.id, data.email)
                    }
                });
            },
            (token, id, email, next) => {
                activateSendMail(id, email, token, (error, sent) => {
                    if (error) {
                        next(error, null)
                    } else {
                        next(null, {"success": true, "msg": "Please activate your account"})
                    }
                });
            }
        ],
        (error, data) => {
            if (error) {
                res.send(error)
            } else {
                res.send(data);
            }
        });
};

const activateUser = (req, res) => {
    async.waterfall([
            (next) => {
                userFindOne({"id": req.query.id}, (error, data) => {
                    if (error) {
                        next(error)
                    } else if (data) {
                        next(null, data)
                    } else {
                        next("No user record found")
                    }
                })
            },
            (data, next) => {
                if (data.status === "ACTIVE") {
                    next("Account is already activated")
                } else {
                    next(null, data.id)
                }
            },
            (id, next) => {
                userUpdateOne({"id": id}, {$set: {"status": "ACTIVE"}}, (error, _) => {
                    if (error) {
                        next(error)
                    } else {
                        next(null, "Your account is activated please login")
                    }
                })
            }
        ],
        (error, data) => {
            if (error) {
                res.send(error)
            } else {
                res.send(data)
            }
        })
};

const loginUser = (req, res) => {
    async.waterfall([
            (next) => {
                userFindOne({"id": req.body.id}, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else if (data) {
                        next(null, data)
                    } else {
                        next("No user record found", null)
                    }
                });
            },
            (data, next) => {
                if (!bcrypt.compareSync(req.body.password, data.password)) {
                    next("username and password does not match", null)
                } else {
                    next(null, data)
                }
            },
            (data, next) => {
                const payload = {
                    "data": {
                        "id": data.id,
                        "name": data.password,
                        "email": data.email,
                    }
                };
                getToken(payload, "rgukt123", {expiresIn: 60 * 60}, (error, token) => {
                    if (error) {
                        next(error, null)
                    } else {
                        next(null, token)
                    }
                })
            },
        ],
        (error, token) => {
            if (error) {
                res.send(error)
            } else {
                res.send({
                    "success": true,
                    "token": token,
                });
            }
        });
};

const updateUser = (req, res) => {
    async.waterfall([
            (next) => {
                userFindOne({id: req.params.id}, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else {
                        if (data.status === "ACTIVE") {
                            next(null, data)
                        } else {
                            next("Please activate your account", null)
                        }
                    }
                })
            },
            (data, next) => {
                userUpdateOne({id: data.id}, req.body, (error, data) => {
                    if (error) {
                        next(error)
                    } else {
                        next(null, data)
                    }
                })
            }
        ],
        (error, result) => {
            if (error) {
                res.send(error)
            } else {
                res.send(result)
            }
        })

};

const deleteUser = (req, res) => {
    async.waterfall([
            (next) => {
                userFindOne({id: req.params.id}, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else if (data) {
                        next(null, data)
                    } else {
                        next("No user record found\n")
                    }
                })
            },
            (data, next) => {
                userDeleteOne({id: data.id}, (error, data) => {
                    if (error) {
                        next(error)
                    } else {
                        next(null, data)
                    }
                })
            }
        ],
        (error, result) => {
            if (error) {
                res.send(error)
            } else {
                res.send(result)
            }
        })
};

module.exports = {
    getUser,
    registerUser,
    activateUser,
    loginUser,
    updateUser,
    deleteUser,
};