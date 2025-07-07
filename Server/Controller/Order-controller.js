require('dotenv').config()
const Stripe = require('stripe')
const Razorpay = require('razorpay')
const orderModel = require('../Model/Order-Model')
const userModel = require('../Model/User-Model')

// global variable
const Currency = 'inr'
const deliveryCharges = 10

// gateway Intialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Using COD payment method
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId
    const { items, amount, address } = req.body
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    }
    // const newOrder = new orderModel(orderData)
    // await newOrder.save()

    // Create new user
    const newOrder = await orderModel.create(orderData)

    await userModel.findByIdAndUpdate(userId, { cartData: {} })
    res
      .status(200)
      .json({ success: true, message: 'Order placed successfully' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Using stripe payment method
const orderStripe = async (req, res) => {
  try {
    const userId = req.userId
    const { items, amount, address } = req.body
    const { origin } = req.headers
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'STRIPE',
      payment: false,
      date: Date.now()
    }
    // const newOrder = new orderModel(orderData)
    // await newOrder.save()

    // Create a new user
    const newOrder = await orderModel.create(orderData)

    const line_items = items.map(item => ({
      price_data: {
        currency: Currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: Currency,
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: deliveryCharges * 100
      },
      quantity: 1
    })
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    })
    res.status(200).json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// verify Stripe payment
const verifyStripe = async (req, res) => {
  const userId = req.userId
  const { orderId, success } = req.body

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.status(200).json({ success: true })
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Using razorpay payment method
const orderRazorpay = async (req, res) => {
  try {
    const userId = req.userId
    const { items, amount, address } = req.body
    // const { origin } = req.headers
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'RAZORPAY',
      payment: false,
      date: Date.now()
    }
    // const newOrder = new orderModel(orderData)
    // await newOrder.save()

    // Create a new user
    const newOrder = await orderModel.create(orderData)

    const option = {
      amount: amount * 100,
      currency: Currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }
    await razorpayInstance.orders.create(option, (error, order) => {
      if (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error })
      }
      res.status(200).json({ success: true, order })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  const userId = req.userId
  const { razorpay_order_id } = req.body
  // console.log( razorpay_order_Id );

  try {
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    // console.log(orderInfo)
    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.status(200).json({ success: true, message: 'payment successful' })
    } else {
      await orderModel.findByIdAndDelete(orderInfo.receipt)
      res.status(400).json({ success: false, message: 'payment failed' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Data for admin panel
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.status(200).json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Data for user showing
const userorder = async (req, res) => {
  try {
    const userId = req.userId

    const orders = await orderModel.find({ userId })
    res.status(200).json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Order status in admin
const orderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    if (!orderId || !status) {
      res
        .status(400)
        .json({ success: false, message: 'orderId and status is required' })
    }

    const statusUpdate = await orderModel.findByIdAndUpdate(orderId, { status })

    if (!statusUpdate) {
      res.status(404).json({ success: false, message: 'Status is not updated' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Order status updated', statusUpdate })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  placeOrder,
  orderStripe,
  orderRazorpay,
  allOrder,
  userorder,
  orderStatus,
  verifyStripe,
  verifyRazorpay
}
