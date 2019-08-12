const userController = require('../controllers/user.controller');
const helpers = require('../helpers/jwt');
const userValidations = require('../validations/user.validations');

const userRouter = (app) => {
    app.get('/user', userController.getUser);
    app.post('/user/register', userValidations.userCreateRequsetValidation, userController.registerUser);
    app.get('/user/activate', helpers.verifyToken, userController.activateUser);
    app.post('/user/login', userController.loginUser);
    app.put('/user/:id', helpers.verifyToken, userController.updateUser);
    app.delete('/user/:id', helpers.verifyToken, userController.deleteUser);
};

module.exports = {
    userRouter,
};
