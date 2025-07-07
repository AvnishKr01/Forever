const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers

    // Check the token 
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized Login' })
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check the decoded email 
    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Access denied: Invalid token role or email'
        })
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = adminAuth
