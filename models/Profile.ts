import mongoose, { Schema, model, models } from "mongoose";

export interface ProfileDoc {
  nameEn?: string;
  nameAr?: string;
  headlineEn?: string;
  headlineAr?: string;
  titleEn?: string;
  titleAr?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  profileImage?: string;
  showProfilePhoto?: boolean;
  profilePhotoPosition?: string;
  cvFile?: string;
  summaryEn?: string;
  summaryAr?: string;
  aboutEn?: string;
  aboutAr?: string;
  aboutImage?: string;
  email?: string;
  phone?: string;
  locationEn?: string;
  locationAr?: string;
  github?: string;
  linkedin?: string;
  kaggle?: string;
  whatsapp?: string;
  twitter?: string;
  ctaHireMeEn?: string;
  ctaHireMeAr?: string;
  ctaDownloadCvEn?: string;
  ctaDownloadCvAr?: string;
  availableForWork?: boolean;
  availabilityLabelEn?: string;
  availabilityLabelAr?: string;
  highlightsEn?: string[];
  highlightsAr?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProfileSchema = new Schema(
  {
    nameEn: { type: String, default: "" },
    nameAr: { type: String, default: "" },
    headlineEn: { type: String, default: "" },
    headlineAr: { type: String, default: "" },
    titleEn: { type: String, default: "" },
    titleAr: { type: String, default: "" },
    subtitleEn: { type: String, default: "" },
    subtitleAr: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    showProfilePhoto: { type: Boolean, default: true },
    profilePhotoPosition: { type: String, default: "50% 38%" },
    cvFile: { type: String, default: "" },
    summaryEn: { type: String, default: "" },
    summaryAr: { type: String, default: "" },
    aboutEn: { type: String, default: "" },
    aboutAr: { type: String, default: "" },
    aboutImage: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    locationEn: { type: String, default: "" },
    locationAr: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    kaggle: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    twitter: { type: String, default: "" },
    ctaHireMeEn: { type: String, default: "" },
    ctaHireMeAr: { type: String, default: "" },
    ctaDownloadCvEn: { type: String, default: "" },
    ctaDownloadCvAr: { type: String, default: "" },
    availableForWork: { type: Boolean, default: false },
    availabilityLabelEn: { type: String, default: "" },
    availabilityLabelAr: { type: String, default: "" },
    highlightsEn: { type: [String], default: [] },
    highlightsAr: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const Profile: mongoose.Model<ProfileDoc> =
  (models.Profile as mongoose.Model<ProfileDoc>) ||
  model<ProfileDoc>("Profile", ProfileSchema);
export default Profile;
