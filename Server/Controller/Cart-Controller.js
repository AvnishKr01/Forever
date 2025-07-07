const userModel = require('../Model/User-Model')

// Add item in the cart
const addCart = async (req, res) => {
  try {
    const userId = req.userId
    const { itemId, size } = req.body

    // Check the userId
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'userID not found' })
    }

    // Find the userId
    const userData = await userModel.findById(userId)

    // Set cartData to userData
    let cartData = userData.cartData || {}

    // Check the cartData ItemId
    if (cartData[itemId]) {
      // Check the ItemId + Size
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }
    // Update the cart item
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json({ success: true, message: 'Item is Added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update item in the cart
const updateCart = async (req, res) => {
  try {
    const userId = req.userId
    const { itemId, size, quantity } = req.body

    // Check the userId
    if (!userId) {
      res.status(400).json({ success: false, message: 'userID not found' })
    }

    // Find the userId
    const userData = await userModel.findById(userId)

    // Set cartData to userData
    let cartData = userData.cartData || {}

    cartData[itemId][size] = quantity

    // Update the cart item
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.status(200).json({ success: true, message: 'Cart is updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get the item in the cart
const getItemCart = async (req, res) => {
  try {
    const userId = req.userId

    // Check the userId
    if (!userId) {
      res.status(400).json({ success: false, message: 'userID not found' })
    }

    // Find the userId
    const userData = await userModel.findById(userId)

    // Set cartData to userData
    const cartData = userData.cartData || {}

    res.status(200).json({ success: true, cartData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { addCart, updateCart, getItemCart }
