require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRouter = require('./Route/User-Routes')
const mongoConnection = require('./Utils/db')
const connectCloudinary = require('./Utils/Cloudinary');
const productRouter = require('./Route/Product-Routes')
const cartRouter = require('./Route/Cart-Routes');
const orderRouter = require('./Route/Order-Routes')

// App Config
const app = express()
const PORT = process.env.PORT || 10000;

connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())


// Server Page Testing
app.get('/:id', (req, res) => {
  console.log('Server page working')
  res.status(200).send('Server is running')
})

// API End Point
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


// In server File Connection Of MongoDB
mongoConnection().then(() => {
  app.listen(PORT, "0.0.0.0" , () => {
    console.log(`Server start ${PORT}`)
  })
})




