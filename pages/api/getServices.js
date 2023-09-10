import connectDB from '../../utils/connectDB';
import Service from '../../models/Service';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const subcategoryId = req.query.subcategoryId;

  try {
    const services = await Service.find({ subcategory: subcategoryId });
    res.status(200).json({ data: services });
    console.log(services)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
