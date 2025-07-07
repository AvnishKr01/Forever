const mongoosh = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoosh.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    cartData: {
      type: Object,
      default: {}
    }
  },
  { minimize: false }
)

// Here Is Generating Token With The Help Of JWT(jsonwebtoken)

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        // role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )
  } catch (error) {
    console.log(error)
  }
}

const userModel = new mongoosh.model('user', userSchema)

module.exports = userModel
