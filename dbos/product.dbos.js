const {productModel} = require('../models/product.model');
const productFindOne = (filter, cb) => {
    productModel.findOne(filter, (error, data) => {
        if (error) {
            cb(error, null)
        } else if (data) {
            cb(null, data)
        } else {
            cb('No product record found', null)
        }
    })
};

const productInsertOne = (data, cb) => {
    productMod = new productModel(data);
    productMod.save(data, (error, doc) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, doc)
        }
    })
};

const productUpdateOne = (filter, updateData, cb) => {
    productModel.updateOne(filter, updateData, (error, doc) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, doc)
        }
    })
};

const productDeleteOne = (filter, cb) => {
    productModel.deleteOne(filter, (error, doc) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, doc)
        }
    })
};

module.exports = {
    productFindOne,
    productInsertOne,
    productUpdateOne,
    productDeleteOne,
};