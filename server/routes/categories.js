import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Category from '../models/Category.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, upload.single('logo'), async (req, res) => {
  try {
    console.log('📁 Category creation request received');
    console.log('Body:', req.body);
    console.log('File:', req.file ? 'Present' : 'Missing');
    
    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    let logoUrl = null;
    let logoPublicId = null;

    if (req.file) {
      console.log('☁️ Uploading logo to Cloudinary...');
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'sonal-agritech/logos' },
          (error, result) => {
            if (error) {
              console.log('❌ Cloudinary error:', error);
              reject(error);
            } else {
              console.log('✅ Logo uploaded successfully');
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer);
      });
      logoUrl = result.secure_url;
      logoPublicId = result.public_id;
    }
    
    console.log('💾 Saving category to database...');
    const category = new Category({ name, slug, description, logoUrl, logoPublicId });
    await category.save();
    
    console.log('✅ Category created successfully');
    res.status(201).json(category);
  } catch (error) {
    console.error('❌ Category creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authMiddleware, upload.single('logo'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    
    if (req.file) {
      if (category.logoPublicId) {
        await cloudinary.uploader.destroy(category.logoPublicId);
      }
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'sonal-agritech/logos' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      category.logoUrl = result.secure_url;
      category.logoPublicId = result.public_id;
    }
    
    category.name = name;
    category.description = description;
    await category.save();
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category.logoPublicId) {
      await cloudinary.uploader.destroy(category.logoPublicId);
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
