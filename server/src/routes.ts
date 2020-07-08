import express from 'express';
import ProductController from './controllers/ProductController';
import SoldController from './controllers/SoldController';

const productController = new ProductController();
const soldController = new SoldController();

const routes = express.Router();

routes.get('/products', productController.index);
routes.get('/products/:id', productController.show);
routes.post('/add', productController.create);
routes.put('/update', productController.update);
routes.delete('/delete', productController.delete);

routes.get('/sold', soldController.index);
routes.get('/sold/:id', soldController.show);
routes.post('/sold', soldController.create);

export default routes;
