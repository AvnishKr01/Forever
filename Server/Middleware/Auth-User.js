const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
  const {token} = req.headers;

  // console.log(token);
  
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized Login Try Again!' })
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decode.userId
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ succes: false, message: error.message })
  }
}

module.exports = authUser
