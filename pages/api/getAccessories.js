import connectDB from '../../utils/connectDB';
import Accessories from '../../models/Accessories';


connectDB();

export default async function handler(req, res) {
  try {
    const categories = await Accessories.find();
    const formattedCategories = categories.map((category) => ({
      _id: category._id,
      name: category.name,
      description: category.description,
      price: category.price,
      image: category.image,
    }));
    res.status(200).json({ success: true, data: formattedCategories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}