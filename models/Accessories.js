const mongoose = require('mongoose');

let Accessories;

try {
    // Check if the model already exists
    Accessories = mongoose.model('Accessories');
} catch (error) {
    // Define the model if it doesn't exist
    const accessoriesSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String, // You can store the image URL or a reference to the image file
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    });
    Accessories = mongoose.model('Accessories', accessoriesSchema);
}

module.exports = Accessories;
