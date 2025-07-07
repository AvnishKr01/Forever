const productModel = require('../Model/Product-Model')

const cloudinary = require('cloudinary').v2

// **************** Add the product logic functionality **************** //
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestSeller,
      sizes
    } = req.body

    // Request the file to the image
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    // Check the the Array is undefine or empty if not empty the store the all image in Array
    const images = [image1, image2, image3, image4].filter(
      item => item !== undefined
    )

    // Makeing the image url in clodinary
    let imageUrl = await Promise.all(
      images.map(async item => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image'
        })
        return result.secure_url
      })
    )

    // Make the new product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === 'true' ? 'true' : 'false',
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now()
    }
    console.log(productData)

    // Create a new product to save in mongo
    const product = await productModel.create(productData)
    res.status(200).json({ success: true, message: 'Product Added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// *************** List the product logic functionality ************************ //
const listProduct = async (req, res) => {
  try {

    // Here list the product
    const product = await productModel.find({})
    res.status(200).json({ success: true, product })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// **************** Remove the product logic functionality ************************** //
const removeProduct = async (req, res) => {
  try {

    // Here delete the product
    await productModel.findByIdAndDelete(req.body.id)
    res.status(200).json({ success: true, message: 'Product Removed' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ******************** Single the product logic functionality ********************* //
const singleProduct = async (req, res) => {
  try {

    const { productId } = req.body

    // Here list the single product
    const product = await productModel.findById(productId)
    res.status(200).json({ success: true, product })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}



module.exports = { addProduct, listProduct, removeProduct, singleProduct }
