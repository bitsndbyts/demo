const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("DB connected");
        }
    });

module.exports = {
    db: mongoose,
};