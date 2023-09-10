import connectDB from '../../utils/connectDB';
import SubCategory from '../../models/SubCategory';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const categoryId = req.query.categoryId;

  try {
    const subcategories = await SubCategory.find({ category: categoryId });
    res.status(200).json({ data: subcategories });
    console.log(subcategories, categoryId)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
