import connectDB from '../../utils/connectDB';
import Service from 'models/Service';

connectDB();

export default async function handler(req, res) {
  try {
    const { serviceId } = req.query;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service }); // Send the complete subcategory object
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
