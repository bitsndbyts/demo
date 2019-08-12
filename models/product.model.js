const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    id: {
        type: String,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ['ADDED', 'ORDERED']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const productModel = mongoose.model('product', productSchema);

module.exports = {
    productModel,
};