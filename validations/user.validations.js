const userCreateRequsetValidation = (req, res, cb) => {
    if (!req.body.hasOwnProperty('name')) {
        res.send('name must be required')
    } else if (!req.body.hasOwnProperty('id')) {
        res.send('id mist be required')
    } else if (!req.body.hasOwnProperty('email')) {
        res.send('email must be required')
    } else if (!req.body.hasOwnProperty('password')) {
        res.send('password must be required');
    } else {
        cb();
    }
};

module.exports = {
    userCreateRequsetValidation,
};