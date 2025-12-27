import mongoose, { Schema, Document } from 'mongoose';


export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  githubLink?: string;
  liveLink?: string;
  contribution?: "individual" | "team";
  year?: string;
  projectType: "Prototype" | "Web Application" | "Mobile Application" | "Website";
  technologiesFramework?: string[];
  createdAt: Date;
}


const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  githubLink: { type: String },
  liveLink: { type: String },
  contribution: { type: String, enum: ["individual", "team"], default: "individual" },
  year: { type: String },
  projectType: { type: String, enum: ["Prototype", "Web Application", "Mobile Application", "Website"], required: true },
  technologiesFramework: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Project as mongoose.Model<IProject>) || 
  mongoose.model<IProject>('Project', ProjectSchema);