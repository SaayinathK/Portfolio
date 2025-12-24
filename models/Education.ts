import mongoose, { Schema, Document } from 'mongoose';

export interface Education extends Document {
  institution: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  isCurrentlyEnrolled: boolean;
  description?: string;
  gpa?: string;
  activities?: string[];
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema({
  institution: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isCurrentlyEnrolled: { type: Boolean, default: false },
  description: { type: String },
  gpa: { type: String },
  activities: [{ type: String }],
  // Stores base64 encoded institution logo image (max ~2MB)
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Education as mongoose.Model<Education>) || 
  mongoose.model<Education>('Education', EducationSchema);