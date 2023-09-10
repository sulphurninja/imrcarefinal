// api/createOrder.js

import connectDB from '../../utils/connectDB';
import Order from '../../models/Order';

connectDB();

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { serviceId, name, contactNumber, address } = req.body;

      // Create a new order
      const order = new Order({
        service: serviceId, // Assuming serviceId is the ID of the selected service
        name,
        contactNumber,
        address,
      });

      await order.save();

      return res.status(201).json({ success: true, data: order });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
