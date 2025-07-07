const express = require('express')
const cartController = require('../Controller/Cart-Controller')
const authUser = require('../Middleware/Auth-User')

const cartRouter = express.Router()

cartRouter.route('/addcart').post(authUser, cartController.addCart)
cartRouter.route('/updatecart').post(authUser, cartController.updateCart)
cartRouter.route('/getcart').post(authUser, cartController.getItemCart)

module.exports = cartRouter
