import mongoose, { Schema, model, models } from "mongoose";

export interface CategoryGroupDoc {
  name: string;
  slug: string;
  description?: string;
  visible?: boolean;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CategoryGroupSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    visible: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const CategoryGroup: mongoose.Model<CategoryGroupDoc> =
  (models.CategoryGroup as mongoose.Model<CategoryGroupDoc>) ||
  model<CategoryGroupDoc>("CategoryGroup", CategoryGroupSchema);
export default CategoryGroup;
