import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  firstName: string;
  lastName: string;
  title: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  profileImageUrl?: string;
  highlights?: string[];
  motto?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String, required: true },
  shortBio: { type: String, required: true },
  longBio: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  resumeUrl: { type: String },
  profileImageUrl: { type: String },
  highlights: [{ type: String }],
  motto: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default (mongoose.models.About as mongoose.Model<IAbout>) || 
  mongoose.model<IAbout>('About', AboutSchema);