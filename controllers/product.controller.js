const async = require('async');
const userDbos = require('../dbos/user.dbos');
const tokenHelpers = require('../helpers/jwt');
const productDbos = require('../dbos/product.dbos');

const getProduct = (req, res) => {
    productDbos.productFindOne({"id": req.params.id}, (error, data) => {
        if (error) {
            res.send(error)
        } else if (data) {
            res.send(data)
        } else {
            res.send("No product record is found")
        }
    })
};

const addProduct = (req, res) => {
    async.waterfall([
            (next) => {
                tokenHelpers.decodeToken(req.headers['token'], (error, data) => {
                    if (error) {
                        next(error)
                    } else {
                        next(null, data)
                    }
                })
            },
            (_data, next) => {
                userDbos.userFindOne({"id": _data.data.id}, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else if (data) {
                        next(data)
                    } else {
                        next("No user record found")
                    }
                })
            },
            (data, next) => {
                const product = {
                    "id": req.params.id,
                    "name": data.name,
                    "userId": data.name,
                    "status": "ADDED",
                };
                productDbos.productInsertOne(product, (error, data) => {
                    if (error) {
                        next(error, null)
                    } else {
                        next(null, data)
                    }
                })
            }
        ],
        (error, data) => {
            if (error) {
                res.send(error)
            } else {
                res.send({
                    "success": true,
                    "Product inserted": data,
                })
            }
        })
};

const orderProduct = (req, res) => {
    async.waterfall([
            (next) => {
                productDbos.productFindOne({id: req.params.id}, (error, data) => {
                    if (error) {
                        next(error)
                    } else {
                        if (data.status === "ADDED") {
                            next(null)
                        } else {
                            next("No product record found")
                        }
                    }
                })
            },
            (next) => {
                productDbos.productUpdateOne({id: req.params.id},
                    {$set: {status: "ORDERED"}}, (error, data) => {
                        if (error) {
                            next(error)
                        } else {
                            next(null)
                        }
                    })
            },
            (next) => {

            }
        ],
        (error, result) => {

        })
};

module.exports = {
    getProduct,
    addProduct,
    orderProduct,
};