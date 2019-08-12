const jwt = require('jsonwebtoken');

const getToken = (payload, password, expiresIn, cb) => {
    jwt.sign({"data": payload}, password, expiresIn, (error, token) => {
        if (error) {
            console.log(error);
            cb(error, null)
        } else {
            cb(null, token)
        }
    })
};

const verifyToken = (req, res, cb) => {
    jwt.verify(req.headers['token'], 'rgukt123', (error) => {
        if (error) {
            res.send('Token verfication failed')
        } else {
            cb()
        }
    })
};

const decodeToken = (token, cb) => {
    jwt.decode(token, (error) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, data)
        }
    })
};

module.exports = {
    getToken,
    verifyToken,
    decodeToken,
};