import connectDB from '../../utils/connectDB';
import Category from '../../models/Category';

connectDB();

export default async function handler(req, res) {
  try {
    const { name, image } = req.body;
    const category = new Category({
      name,
      image,
    });

    await category.save();
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
