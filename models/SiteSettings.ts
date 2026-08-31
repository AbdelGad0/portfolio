import mongoose, { Schema, model, models } from "mongoose";

export interface SectionConfigDoc {
  key?: string;
  labelEn?: string;
  labelAr?: string;
  visible?: boolean;
  order?: number;
}

export interface SiteSettingsDoc {
  siteTitleEn?: string;
  siteTitleAr?: string;
  defaultMetaTitleEn?: string;
  defaultMetaTitleAr?: string;
  siteNameEn?: string;
  siteNameAr?: string;
  defaultMetaDescriptionEn?: string;
  defaultMetaDescriptionAr?: string;
  siteDescriptionEn?: string;
  siteDescriptionAr?: string;
  siteKeywords?: string[];
  ogTitleEn?: string;
  ogTitleAr?: string;
  ogDescriptionEn?: string;
  ogDescriptionAr?: string;
  ogImage?: string;
  favicon?: string;
  defaultTheme?: "dark" | "light";
  defaultLanguage?: "en" | "ar";
  sections?: SectionConfigDoc[];
  analytics?: { googleAnalyticsId?: string; enabled?: boolean };
  maintenanceMode?: boolean;
  projectsDisplayMode?: "selected" | "grouped";
  footerTextEn?: string;
  footerTextAr?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const SiteSettingsSchema = new Schema(
  {
    siteTitleEn: { type: String, default: "" },
    siteTitleAr: { type: String, default: "" },
    defaultMetaTitleEn: { type: String, default: "" },
    defaultMetaTitleAr: { type: String, default: "" },
    siteNameEn: { type: String, default: "" },
    siteNameAr: { type: String, default: "" },
    defaultMetaDescriptionEn: { type: String, default: "" },
    defaultMetaDescriptionAr: { type: String, default: "" },
    siteDescriptionEn: { type: String, default: "" },
    siteDescriptionAr: { type: String, default: "" },
    siteKeywords: { type: [String], default: [] },
    ogTitleEn: { type: String, default: "" },
    ogTitleAr: { type: String, default: "" },
    ogDescriptionEn: { type: String, default: "" },
    ogDescriptionAr: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    favicon: { type: String, default: "" },
    defaultTheme: { type: String, enum: ["dark", "light"], default: "dark" },
    defaultLanguage: { type: String, enum: ["en", "ar"], default: "en" },
    sections: {
      type: [
        {
          key: { type: String, default: "" },
          labelEn: { type: String, default: "" },
          labelAr: { type: String, default: "" },
          visible: { type: Boolean, default: true },
          order: { type: Number, default: 0 }
        }
      ],
      default: []
    },
    analytics: {
      googleAnalyticsId: { type: String, default: "" },
      enabled: { type: Boolean, default: false }
    },
    maintenanceMode: { type: Boolean, default: false },
    projectsDisplayMode: { type: String, enum: ["selected", "grouped"], default: "grouped" },
    footerTextEn: { type: String, default: "" },
    footerTextAr: { type: String, default: "" }
  },
  { timestamps: true }
);

export const SiteSettings: mongoose.Model<SiteSettingsDoc> =
  (models.SiteSettings as mongoose.Model<SiteSettingsDoc>) ||
  model<SiteSettingsDoc>("SiteSettings", SiteSettingsSchema);
export default SiteSettings;
