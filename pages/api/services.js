import connectDB from '../../utils/connectDB';
import Service from '../../models/Service';

connectDB();

export default async function handler(req, res) {
      try {
        const { name, description, subcategory} = req.body;
        const service = new Service({
        name,
        description,
        subcategory
      });

      await service.save();
        res.status(200).json({ success: true, data: service });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
