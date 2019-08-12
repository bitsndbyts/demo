const productController = require('../controllers/product.controller');
const helpers = require('../helpers/jwt');

const productRoutes = (app) => {
    app.get('/product/:id', productController.getProduct);
    app.post('/product/:id/', helpers.verifyToken, productController.addProduct);
    app.post('/product/order/:id/', helpers.verifyToken, productController.orderProduct)
};

module.exports = {
    productRoutes,
};