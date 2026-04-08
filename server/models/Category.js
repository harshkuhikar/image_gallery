import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  logoUrl: String,
  logoPublicId: String
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
