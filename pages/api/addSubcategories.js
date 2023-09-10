import connectDB from '../../utils/connectDB';
import SubCategory from '../../models/SubCategory';

connectDB();

export default async function handler(req, res) {
    
      try {
        const { name, image, category} = req.body;
        const subcategory = new SubCategory({
        name,
        image,
        category
      });

      await subcategory.save();
        res.status(200).json({ success: true, data: subcategory });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
