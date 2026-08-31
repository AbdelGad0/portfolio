export interface Profile {
  _id?: string;
  nameEn: string;
  nameAr: string;
  headlineEn: string;
  headlineAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  profileImage: string;
  showProfilePhoto: boolean;
  profilePhotoPosition: string;
  cvFile: string;
  summaryEn: string;
  summaryAr: string;
  aboutEn: string;
  aboutAr: string;
  aboutImage: string;
  email: string;
  phone: string;
  locationEn: string;
  locationAr: string;
  github: string;
  linkedin: string;
  kaggle: string;
  whatsapp: string;
  twitter: string;
  ctaHireMeEn: string;
  ctaHireMeAr: string;
  ctaDownloadCvEn: string;
  ctaDownloadCvAr: string;
  availableForWork: boolean;
  availabilityLabelEn: string;
  availabilityLabelAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
}

export interface Project {
  _id?: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  shortSummaryEn: string;
  shortSummaryAr: string;
  executiveSummaryEn: string;
  executiveSummaryAr: string;
  category: string;
  problemStatementEn: string;
  problemStatementAr: string;
  businessObjectiveEn: string;
  businessObjectiveAr: string;
  datasetOverviewEn: string;
  datasetOverviewAr: string;
  technicalApproachEn: string;
  technicalApproachAr: string;
  resultsEn: string;
  resultsAr: string;
  modelUsed: string;
  evaluationMetrics: string[];
  tools: string[];
  githubLink: string;
  liveDemoLink: string;
  kaggleLink: string;
  thumbnail: string;
  ogImage: string;
  screenshots: string[];
  featured: boolean;
  featuredOnHomepage: boolean;
  homepageCategoryOrder: number;
  visible: boolean;
  displayOrder: number;
}

export interface SkillCategory {
  _id?: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  visible: boolean;
  sortOrder: number;
}

export interface Skill {
  _id?: string;
  nameEn: string;
  nameAr: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon: string;
  visible: boolean;
  order: number;
}

export interface Experience {
  _id?: string;
  titleEn: string;
  titleAr: string;
  companyEn: string;
  companyAr: string;
  durationEn: string;
  durationAr: string;
  bulletsEn: string[];
  bulletsAr: string[];
  tools: string[];
  current: boolean;
  visible: boolean;
  order: number;
}

export interface Education {
  _id?: string;
  degreeEn: string;
  degreeAr: string;
  institutionEn: string;
  institutionAr: string;
  fieldOfStudyEn: string;
  fieldOfStudyAr: string;
  startDate: string;
  endDate: string;
  descriptionEn: string;
  descriptionAr: string;
  grade: string;
  logo: string;
  visible: boolean;
  order: number;
}

export interface Certification {
  _id?: string;
  nameEn: string;
  nameAr: string;
  issuer: string;
  date: string;
  descriptionEn: string;
  descriptionAr: string;
  credentialUrl: string;
  badge: string;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface SectionConfig {
  key: string;
  labelEn: string;
  labelAr: string;
  visible: boolean;
  order: number;
}
