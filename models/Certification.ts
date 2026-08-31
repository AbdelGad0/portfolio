import mongoose, { Schema, model, models } from "mongoose";

export interface CertificationDoc {
  nameEn?: string;
  nameAr?: string;
  issuer?: string;
  date?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  credentialUrl?: string;
  badge?: string;
  featured?: boolean;
  visible?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CertificationSchema = new Schema(
  {
    nameEn: { type: String, default: "" },
    nameAr: { type: String, default: "" },
    issuer: { type: String, default: "" },
    date: { type: String, default: "" },
    descriptionEn: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    badge: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Certification: mongoose.Model<CertificationDoc> =
  (models.Certification as mongoose.Model<CertificationDoc>) ||
  model<CertificationDoc>("Certification", CertificationSchema);
export default Certification;
