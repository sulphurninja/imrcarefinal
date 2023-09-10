const mongoose = require('mongoose');

let Service;

try {
  // Check if the model already exists
  Service = mongoose.model('Service');
} catch (error) {
  // Define the model if it doesn't exist
  const serviceSchema = new mongoose.Schema({
    subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  });

  Service = mongoose.model('Service', serviceSchema);
}

module.exports = Service;
