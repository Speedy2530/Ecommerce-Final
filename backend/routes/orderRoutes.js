import express from 'express';
const router = express.Router();
import { 
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleWare.js'

//all of these are connected to '/api/orders'

router.route('/').post(protect, addOrderItems)
                 .get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;