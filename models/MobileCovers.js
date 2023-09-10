const mongoose = require('mongoose');

let MobileCovers;

try {
    // Check if the model already exists
    MobileCovers = mongoose.model('MobileCovers');
} catch (error) {
    // Define the model if it doesn't exist
    const coversSchema = new mongoose.Schema({
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
    MobileCovers = mongoose.model('MobileCovers', coversSchema);
}

module.exports = MobileCovers;
