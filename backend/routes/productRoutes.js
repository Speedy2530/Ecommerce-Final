import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';
import { createProductReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleWare.js'
import { getTopProducts } from '../controllers/productController.js';

//Simplifed this by moving the routing functions into another folder called "controllers"
//Here I'm just calling the functions
//All connected to '/products'

router.route('/').get(getProducts);
router.get('/top', getTopProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview)

export default router;