import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  type?: "individual" | "team";
  year?: string;
  technologies?: string[];
  createdAt: Date;
}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  imageUrl: { type: String, required: true },
  tags: [{ type: String }],
  githubLink: { type: String },
  liveLink: { type: String },
  type: { type: String, enum: ["individual", "team"], default: "individual" },
  year: { type: String },
  technologies: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Project as mongoose.Model<IProject>) || 
  mongoose.model<IProject>('Project', ProjectSchema);