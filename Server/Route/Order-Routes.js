const express = require('express');
const authUser = require('../Middleware/Auth-User');
const adminAuth = require('../Middleware/Admin-Auth');


const orderController = require('../Controller/Order-controller');

const orderRouter = express.Router()

// Using Payment Method Routes
orderRouter.route('/place').post(authUser, orderController.placeOrder)
orderRouter.route('/stripe').post(authUser, orderController.orderStripe)
orderRouter.route('/razorpay').post(authUser, orderController.orderRazorpay)

// Admin Order 
orderRouter.route('/allorder').post(adminAuth, orderController.allOrder)
orderRouter.route('/Status').post(adminAuth, orderController.orderStatus)

// Admin User 
orderRouter.route('/userorder').post(authUser, orderController.userorder)

// Payment Verify gateway
orderRouter.route('/verifystripe').post(authUser, orderController.verifyStripe)
orderRouter.route('/verifyrazorpay').post(authUser, orderController.verifyRazorpay)

module.exports = orderRouter