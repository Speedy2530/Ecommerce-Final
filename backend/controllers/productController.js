import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';



//Create a new review
//route: POST /api/products/:id/reviews
//access: private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReview = product.reviews.length

        product.rating = product.reviews.reduce(
            (acc, review) => acc + review.rating, 0) 
        / product.reviews.length
            
        await product.save();
        res.status(201).json({ message: 'Review added'})
    }
    else {
        res.status(404)
        throw new Error('Resource not found')
    }
})

//Fetches all products
//route: GET /api/products
//access: public (if it was private it would be admin)
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4; //how many products max per page
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword 
        ? { name: { $regex: req.query.keyword, $options: 'i' } } 
        : {}; //case (lower/upper case) insensitive and broad search

    const count = await Product.countDocuments({...keyword}); //amount of products
    
    const products = await Product.find({...keyword}) 
        .limit(pageSize)
        .skip(pageSize * (page - 1)) 
            //then it will limit (pageSize) number of products (2 in this case)
            //then it will skip the products in other pages

    res.json({ products, page, pages: Math.ceil(count / pageSize)});
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

//Get top rated products
//route: GET /api/produts/top
//acccess: public

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ numReview : -1 }).limit(3)
    res.status(200).json(products)
})

export { getProducts, getProductById, createProductReview, getTopProducts }