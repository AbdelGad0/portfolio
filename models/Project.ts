import mongoose, { Schema, model, models } from "mongoose";

export interface ProjectDoc {
  titleEn?: string;
  titleAr?: string;
  slug: string;
  shortSummaryEn?: string;
  shortSummaryAr?: string;
  executiveSummaryEn?: string;
  executiveSummaryAr?: string;
  category?: string;
  problemStatementEn?: string;
  problemStatementAr?: string;
  businessObjectiveEn?: string;
  businessObjectiveAr?: string;
  datasetOverviewEn?: string;
  datasetOverviewAr?: string;
  technicalApproachEn?: string;
  technicalApproachAr?: string;
  resultsEn?: string;
  resultsAr?: string;
  modelUsed?: string;
  evaluationMetrics?: string[];
  tools?: string[];
  githubLink?: string;
  liveDemoLink?: string;
  kaggleLink?: string;
  thumbnail?: string;
  ogImage?: string;
  screenshots?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  featured?: boolean;
  featuredOnHomepage?: boolean;
  homepageCategoryOrder?: number;
  visible?: boolean;
  displayOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = new Schema(
  {
    titleEn: { type: String, default: "" },
    titleAr: { type: String, default: "" },
    slug: { type: String, unique: true, required: true },
    shortSummaryEn: { type: String, default: "" },
    shortSummaryAr: { type: String, default: "" },
    executiveSummaryEn: { type: String, default: "" },
    executiveSummaryAr: { type: String, default: "" },
    category: { type: String, default: "" },
    problemStatementEn: { type: String, default: "" },
    problemStatementAr: { type: String, default: "" },
    businessObjectiveEn: { type: String, default: "" },
    businessObjectiveAr: { type: String, default: "" },
    datasetOverviewEn: { type: String, default: "" },
    datasetOverviewAr: { type: String, default: "" },
    technicalApproachEn: { type: String, default: "" },
    technicalApproachAr: { type: String, default: "" },
    resultsEn: { type: String, default: "" },
    resultsAr: { type: String, default: "" },
    modelUsed: { type: String, default: "" },
    evaluationMetrics: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    githubLink: { type: String, default: "" },
    liveDemoLink: { type: String, default: "" },
    kaggleLink: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    screenshots: { type: [String], default: [] },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    featuredOnHomepage: { type: Boolean, default: false },
    homepageCategoryOrder: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Project: mongoose.Model<ProjectDoc> =
  (models.Project as mongoose.Model<ProjectDoc>) ||
  model<ProjectDoc>("Project", ProjectSchema);
export default Project;
