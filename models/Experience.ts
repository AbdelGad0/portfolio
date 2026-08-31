import mongoose, { Schema, model, models } from "mongoose";

export interface ExperienceDoc {
  titleEn?: string;
  titleAr?: string;
  companyEn?: string;
  companyAr?: string;
  durationEn?: string;
  durationAr?: string;
  bulletsEn?: string[];
  bulletsAr?: string[];
  tools?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  current?: boolean;
  visible?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ExperienceSchema = new Schema(
  {
    titleEn: { type: String, default: "" },
    titleAr: { type: String, default: "" },
    companyEn: { type: String, default: "" },
    companyAr: { type: String, default: "" },
    durationEn: { type: String, default: "" },
    durationAr: { type: String, default: "" },
    bulletsEn: { type: [String], default: [] },
    bulletsAr: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
    ogImage: { type: String, default: "" },
    current: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Experience: mongoose.Model<ExperienceDoc> =
  (models.Experience as mongoose.Model<ExperienceDoc>) ||
  model<ExperienceDoc>("Experience", ExperienceSchema);
export default Experience;
