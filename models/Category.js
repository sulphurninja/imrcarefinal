const mongoose = require('mongoose');

let Category;

try {
  // Check if the model already exists
  Category = mongoose.model('Category');
} catch (error) {
  // Define the model if it doesn't exist
  const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });

  Category = mongoose.model('Category', categorySchema);
}

module.exports = Category;
