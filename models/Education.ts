import mongoose, { Schema, model, models } from "mongoose";

export interface EducationDoc {
  degreeEn?: string;
  degreeAr?: string;
  institutionEn?: string;
  institutionAr?: string;
  fieldOfStudyEn?: string;
  fieldOfStudyAr?: string;
  startDate?: string;
  endDate?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  grade?: string;
  logo?: string;
  visible?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const EducationSchema = new Schema(
  {
    degreeEn: { type: String, default: "" },
    degreeAr: { type: String, default: "" },
    institutionEn: { type: String, default: "" },
    institutionAr: { type: String, default: "" },
    fieldOfStudyEn: { type: String, default: "" },
    fieldOfStudyAr: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    descriptionEn: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    grade: { type: String, default: "" },
    logo: { type: String, default: "" },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Education: mongoose.Model<EducationDoc> =
  (models.Education as mongoose.Model<EducationDoc>) ||
  model<EducationDoc>("Education", EducationSchema);
export default Education;
