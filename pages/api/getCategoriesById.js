import connectDB from '../../utils/connectDB';
import Category from '../../models/Category';

connectDB();

export default async function handler(req, res) {
  try {
    const { categoryId } = req.query;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: { name: category.name } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
