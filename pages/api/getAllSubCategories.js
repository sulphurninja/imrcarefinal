import connectDB from '../../utils/connectDB';
import SubCategory from '../../models/SubCategory';

connectDB();

export default async function handler(req, res) {
  try {
    const subcategories = await SubCategory.find();
  
    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}