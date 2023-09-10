// api/createAccessory.js

import connectDB from '../../utils/connectDB';
import MobileAccessory from '../../models/Accessories';

connectDB();

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, image, description, price } = req.body;

      // Create a new accessory
      const accessory = new MobileAccessory({
        name,
        image,
        description,
        price,
      });

      await accessory.save();

      return res.status(201).json({ success: true, data: accessory });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
