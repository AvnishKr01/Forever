const mongoosh = require('mongoose')

const productSchema = new mongoosh.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type:String,
    required:true
  },
  price: {
    type:Number,
    required:true
  },
  category: {
    type:String,
    required:true
  },
  subCategory: {
    type:String,
    required:true
  },
  sizes: {
    type:Array,
    required:true
  },
  image: {
    type:Array,
    required:true
  },
  bestSeller: {
    type:Boolean,
    required:true
  },
  date: {
    type: Number,
    required:true
  }
});

const productModle = new mongoosh.model('product', productSchema);

module.exports = productModle
