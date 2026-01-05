import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  organization?: string;
  date?: Date;
  description?: string;
  category?: "athletics" | "leadership" | "academic" | "other";
  year?: string;
  icon?: string;
  imageUrl?: string; // <-- Added for image support
  createdAt: Date;
}

const AchievementSchema = new Schema({
  title: { type: String, required: true },
  organization: { type: String },
  date: { type: Date },
  description: { type: String },
  category: { type: String, enum: ["athletics", "leadership", "academic", "other"], default: "other" },
  year: { type: String },
  imageUrl: { type: String }, // <-- Added for image support
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Achievement as mongoose.Model<IAchievement>) || 
  mongoose.model<IAchievement>('Achievement', AchievementSchema);
