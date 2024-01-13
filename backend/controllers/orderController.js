import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'
import Product from '../models/orderModel.js';

//These controllers give endpoints that http requests reach

//Create new order
//route: POST /api/orders
//access: private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items')
    }
    else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
})

//Get logged in user order
//route: GET /api/orders/myorders
//access: private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id})
    res.status(200).json(orders)
})

//Get order by ID
//route: GET /api/orders/:id
//access: private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//Update order to paid
//route: GET /api/orders/:id/pay
//access: private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid')
})

//Update order to delivered
//route: GET /api/orders/:id/delivered
//access: private/ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered')
})

//Get all orders
//route: GET /api/orders
//access: private/ADMIN
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get all orders')
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders,
}
