const mongoosh = require('mongoose')

const MongoURI = process.env.MONGOOSH_URI

// Logic For mongoosh Connection
const mongoConnection = async () => {
  try {
    mongoosh.connect(MongoURI)
    console.log('Database is connected')
    
  } catch (error) {
    console.log('Connection Failed')
    process.exit(0)
  }
}

module.exports = mongoConnection
