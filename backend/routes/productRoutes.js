import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';

//Simplifed this by moving the routing functions into another folder called "controllers"
//Here I'm just calling the functions

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;