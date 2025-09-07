const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'item',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1.']
    },
    price: Number
  }],
  bill: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', OrderSchema);
