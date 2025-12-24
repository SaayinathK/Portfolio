import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  type: "Technical Skills" | "Languages Spoken";
  subtype?: string;
  name: string;
  language?: string;
  level?: string;
  languageProficiency?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    type: {
      type: String,
      required: true,
      enum: ["Technical Skills", "Languages Spoken"],
    },

    subtype: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
    },

    level: {
      type: String,
    },

    languageProficiency: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default (mongoose.models.Skill as mongoose.Model<ISkill>) ||
  mongoose.model<ISkill>("Skill", SkillSchema);
