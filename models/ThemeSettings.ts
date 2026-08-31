import mongoose, { Schema, model, models } from "mongoose";

export interface ThemeSettingsDoc {
  singletonKey?: string;
  colorTheme?:
    | "default"
    | "emerald-pro"
    | "blue-tech"
    | "purple-ai"
    | "cyan-data"
    | "amber-minimal"
    | "monochrome"
    | "neon-dark";
  radius?: "soft" | "rounded" | "sharp";
  cardStyle?: "premium" | "glass" | "minimal";
  typographyScale?: "compact" | "balanced" | "large";
  sectionSpacing?: "tight" | "normal" | "relaxed";
  createdAt?: Date;
  updatedAt?: Date;
}

export const ThemeSettingsSchema = new Schema(
  {
    singletonKey: { type: String, default: "theme", unique: true },
    colorTheme: {
      type: String,
      enum: ["default", "emerald-pro", "blue-tech", "purple-ai", "cyan-data", "amber-minimal", "monochrome", "neon-dark"],
      default: "default"
    },
    radius: { type: String, enum: ["soft", "rounded", "sharp"], default: "soft" },
    cardStyle: { type: String, enum: ["premium", "glass", "minimal"], default: "premium" },
    typographyScale: { type: String, enum: ["compact", "balanced", "large"], default: "balanced" },
    sectionSpacing: { type: String, enum: ["tight", "normal", "relaxed"], default: "normal" }
  },
  { timestamps: true }
);

export const ThemeSettings: mongoose.Model<ThemeSettingsDoc> =
  (models.ThemeSettings as mongoose.Model<ThemeSettingsDoc>) ||
  model<ThemeSettingsDoc>("ThemeSettings", ThemeSettingsSchema);
export default ThemeSettings;
