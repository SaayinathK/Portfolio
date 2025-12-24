import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  studentEmail?: string;
  workEmail?: string;
  phone: string;
  location: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentEmail: { type: String },
    workEmail: { type: String },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  { timestamps: true }
);

export default (mongoose.models.Contact as mongoose.Model<IContact>) ||
  mongoose.model<IContact>("Contact", ContactSchema);