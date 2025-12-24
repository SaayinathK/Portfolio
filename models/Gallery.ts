import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description?: string;
  images: string[];
  createdAt: Date;
}

const GallerySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: { type: [String], required: true, validate: [arrayMinLength, 'At least one image is required'] },
  createdAt: { type: Date, default: Date.now },
});

function arrayMinLength(val: string[]) {
  return val.length > 0;
}

export default (mongoose.models.Gallery as mongoose.Model<IGallery>) || 
  mongoose.model<IGallery>('Gallery', GallerySchema);