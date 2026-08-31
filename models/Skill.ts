import mongoose, { Schema, model, models } from "mongoose";

export interface SkillDoc {
  nameEn?: string;
  nameAr?: string;
  category?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon?: string;
  visible?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SkillSchema = new Schema(
  {
    nameEn: { type: String, default: "" },
    nameAr: { type: String, default: "" },
    category: { type: String, default: "" },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate"
    },
    icon: { type: String, default: "" },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1, order: 1 });

export const Skill: mongoose.Model<SkillDoc> =
  (models.Skill as mongoose.Model<SkillDoc>) ||
  model<SkillDoc>("Skill", SkillSchema);
export default Skill;
