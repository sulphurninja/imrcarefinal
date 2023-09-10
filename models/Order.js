// models/Order.js

import mongoose from "mongoose";

let Order;

try {
  // Check if the model already exists
  Order = mongoose.model('Order');
} catch (error) {
  // Define the model if it doesn't exist
  const orderSchema = new mongoose.Schema({
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service', // Reference to your Service model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  Order = mongoose.model('Order', orderSchema);
}

module.exports = Order;
