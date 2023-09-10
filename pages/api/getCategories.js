import connectDB from '../../utils/connectDB';
import Category from '../../models/Category';

connectDB();

export default async function handler(req, res) {
  try {
    const categories = await Category.find();
    const formattedCategories = categories.map((category) => ({
      _id: category._id,
      name: category.name,
      image: category.image,
    }));
    res.status(200).json({ success: true, data: formattedCategories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}