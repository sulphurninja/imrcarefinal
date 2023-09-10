const mongoose = require('mongoose');

let Subcategory;

try {
  // Check if the model already exists
  Subcategory = mongoose.model('Subcategory');
} catch (error) {
  // Define the model if it doesn't exist
  const subcategorySchema = new mongoose.Schema({
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });

  Subcategory = mongoose.model('Subcategory', subcategorySchema);
}

module.exports = Subcategory;
