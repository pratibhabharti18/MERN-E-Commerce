const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Use ObjectId for references
    ref: 'user',
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId, // Use ObjectId for references
      ref: 'item',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1.'],
      default: 1 // fixed typo: 'deafult' -> 'default'
    },
    price: Number
  }],
  bill: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('cart', CartSchema);
