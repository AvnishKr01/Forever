const express = require('express')
const productController = require('../Controller/Product-Controller')
const upload = require('../Middleware/Multer')
const adminAuth = require('../Middleware/Admin-Auth')

const productRouter = express.Router()

productRouter.route('/add').post(
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  productController.addProduct
)
productRouter.route('/list').get(productController.listProduct)
productRouter.route('/remove').post(productController.removeProduct)
productRouter.route('/single').post(adminAuth, productController.singleProduct)

module.exports = productRouter
