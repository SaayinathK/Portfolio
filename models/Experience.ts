import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  title: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrentlyWorking: boolean;
  description?: string;
  achievements: string[];
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrentlyWorking: { type: Boolean, default: false },
    description: { type: String },
    achievements: [{ type: String }],
    // Stores base64 encoded company logo image (max ~2MB)
    logo: { 
      type: String,
      validate: {
        validator: function(v: string) {
          if (!v) return true; // Allow empty/undefined
          return v.length <= 2621440; // ~2MB limit for base64 string
        },
        message: 'Logo image is too large (max 2MB)'
      }
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Experience as mongoose.Model<IExperience>) || 
  mongoose.model<IExperience>("Experience", ExperienceSchema);