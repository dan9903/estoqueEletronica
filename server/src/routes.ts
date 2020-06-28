import express from 'express';
import ProductController from './controllers/ProductController';

const productController = new ProductController();

const routes = express.Router();

routes.get('/products', productController.index);
routes.get('/products/:id', productController.show);
routes.post('/add', productController.create);
routes.put('/update', productController.update);
routes.delete('/delete', productController.delete);

export default routes;