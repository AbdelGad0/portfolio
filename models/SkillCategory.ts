import mongoose, { Schema, model, models } from "mongoose";

export interface SkillCategoryDoc {
  nameEn?: string;
  nameAr?: string;
  slug: string;
  descriptionEn?: string;
  descriptionAr?: string;
  icon?: string;
  visible?: boolean;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SkillCategorySchema = new Schema(
  {
    nameEn: { type: String, default: "" },
    nameAr: { type: String, default: "" },
    slug: { type: String, required: true, unique: true },
    descriptionEn: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    icon: { type: String, default: "" },
    visible: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

SkillCategorySchema.index({ visible: 1, sortOrder: 1 });

export const SkillCategory: mongoose.Model<SkillCategoryDoc> =
  (models.SkillCategory as mongoose.Model<SkillCategoryDoc>) ||
  model<SkillCategoryDoc>("SkillCategory", SkillCategorySchema);
export default SkillCategory;
