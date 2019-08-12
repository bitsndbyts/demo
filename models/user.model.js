const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    id: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "REGISTER"],
        default: "INACTIVE",
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

const userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel,
};