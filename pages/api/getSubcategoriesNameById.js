import connectDB from '../../utils/connectDB';
import Subcategory from 'models/SubCategory';

connectDB();

export default async function handler(req, res) {
  try {
    const { subcategoryId } = req.query;
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }
    res.status(200).json({ success: true, data: { name: subcategory.name } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
