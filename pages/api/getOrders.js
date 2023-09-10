import connectDB from '../../utils/connectDB';
import Order from '../../models/Order';

connectDB();

export default async function handler(req, res) {
  try {
    const orders = await Order.find();
  
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}