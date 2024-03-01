const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  rating: Number,
  price: Number,
  offPrice: Number,
  image: String,
  published: Boolean,
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
