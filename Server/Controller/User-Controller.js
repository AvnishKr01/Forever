const userModel = require('../Model/User-Model')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// User Home Controller Logic
const home = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Home page' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// User Registration Logic Functionality
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check the all fields is required
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are requires' })
    }

    //Checking if email exist or not
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is already exists' })
    }

    // Validate Email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please Enter The Valid Email' })
    }

    // Validate strong password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'Please Enter The Strong Password' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(password, salt)

    // Create the new User
    const newUser = await userModel.create({
      name,
      email,
      password: hash_password
    })

    // Send the success response
    res.status(200).json({
      success: true,
      message: 'Register Successfully Done',
      token: await newUser.generateToken(),
      userId: newUser._id.toString()
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// User Login Logic Functionality
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    //Check if the email is exist or not
    const userExist = await userModel.findOne({ email })
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is not exist' })
    }

    // Comapare the new password to databse password
    const isMatch = await bcrypt.compare(password, userExist.password)

    // If Password is Match then send response
    if (isMatch) {
      return res.status(200).json({
        success: true,
        message: 'Login successfully done',
        token: await userExist.generateToken(),
        userId: userExist._id.toString()
      })
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'password not match' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ succes: false, message: error.message })
  }
}

// Admin Login Logic Functionality
const admin = async (req, res) => {
  try {
    const {email, password} = req.body

    //Check if email and password is right 
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    const token = jwt.sign({email,password, role:'admin'}, process.env.JWT_SECRET, {expiresIn:'1d'})
      return res.status(200).json({
        succe: true,
        message: "Admin Login Successfully",
        token
      })
    }else{
      res.status(400).json({succes:false, message:"Invalid Crendential"});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ succes: false, message: error.message })
  }
}

// Exports all these here
module.exports = { home, register, login, admin }
