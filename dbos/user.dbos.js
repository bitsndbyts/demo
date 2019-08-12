const {userModel} = require('../models/user.model');
const userFindOne = (filter, cb) => {
    userModel.findOne(filter, (error, data) => {
        if (error) {
            cb(error, null)
        } else if (data) {
            cb(null, data)
        } else {
            cb(null, null)
        }
    })
};

const userInsertOne = (data, cb) => {
    userMod = new userModel(data);
    userMod.save(data, (error, doc) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, doc)
        }
    })
};

const userUpdateOne = (filter, updateData, cb) => {
    userModel.updateOne(filter, updateData, (error, data) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, data)
        }
    })
};

const userDeleteOne = (filter, cb) => {
    userModel.deleteOne(filter, (error, data) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, data)
        }
    })
};

module.exports = {
    userFindOne,
    userInsertOne,
    userUpdateOne,
    userDeleteOne,
};