import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//Fetches all products
//route: GET /api/products
//access: public (if it was private it would be admin)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}) //empty object will get all products
    res.json(products);
})

//Fetches a unique product
//route: GET /api/products/:id
//access: public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); //find by id
    
    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
})

export { getProducts, getProductById }