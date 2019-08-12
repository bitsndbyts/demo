const body_parser = require('body-parser');
const express = require('express');
const http = require('http');
const mongo = require('./database');
const {router} = require('./routes/index');

let app = express();
app.use(body_parser.urlencoded({
    extended: false,
}));
app.use(body_parser.json());
app.listen(8000, (error) => {
    if (error) {
        console.log('Error occurred while starting the server');
    } else {
        console.log("Server is running on 8000 port");
    }
});

router(app);
module.exports = {
    app,
};
