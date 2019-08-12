const {userRouter} = require('../routes/user.routes');
const {productRoutes} = require('../routes/product.routes');

const router = (app) => {
    userRouter(app);
    productRoutes(app);
};

module.exports = {
    router,
};