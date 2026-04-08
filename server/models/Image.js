import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  publicId: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String]
}, { timestamps: true });

export default mongoose.model('Image', imageSchema);
