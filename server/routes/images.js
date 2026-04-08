import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Image from '../models/Image.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

console.log('🔧 Cloudinary Configuration:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'undefined');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    
    const images = await Image.find(query)
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Image.countDocuments(query);
    
    res.json({ images, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    console.log('📤 Upload request received');
    console.log('File:', req.file ? 'Present' : 'Missing');
    console.log('Body:', req.body);
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { title, description, category, tags } = req.body;
    
    console.log('☁️ Uploading to Cloudinary...');
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'sonal-agritech' },
        (error, result) => {
          if (error) {
            console.log('❌ Cloudinary error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary upload successful');
            resolve(result);
          }
        }
      );
      uploadStream.end(req.file.buffer);
    });

    console.log('💾 Saving to database...');
    const image = new Image({
      title,
      description,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      category,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });

    await image.save();
    await image.populate('category');
    
    console.log('✅ Image saved successfully');
    res.status(201).json(image);
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { title, description, category, tags: tags ? tags.split(',').map(t => t.trim()) : [] },
      { new: true }
    ).populate('category');
    
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

export default router;
