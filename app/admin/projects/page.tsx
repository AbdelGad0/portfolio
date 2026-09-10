"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "titleEn", label: "Title (EN)", full: true },
  { key: "titleAr", label: "Title (AR)", full: true },
  { key: "slug", label: "Slug", full: true },
  { key: "shortSummaryEn", label: "Short summary (EN)", type: "textarea", rows: 2, full: true },
  { key: "shortSummaryAr", label: "Short summary (AR)", type: "textarea", rows: 2, full: true },
  { key: "category", label: "Category" },
  { key: "githubLink", label: "GitHub URL", full: true },
  { key: "liveDemoLink", label: "Live demo URL", full: true },
  { key: "kaggleLink", label: "Kaggle URL", full: true },
  { key: "modelUsed", label: "Model used" },
  { key: "tools", label: "Tools (comma separated)", type: "array", full: true },
  { key: "evaluationMetrics", label: "Metrics (comma separated)", type: "array", full: true },
{ key: "thumbnail", label: "Thumbnail", type: "image" },
  { key: "screenshots", label: "Screenshots", type: "images", full: true },
  { key: "displayOrder", label: "Display order", type: "number" },
  { key: "homepageCategoryOrder", label: "Homepage category order", type: "number" },
  { key: "featuredOnHomepage", label: "Featured on homepage", type: "boolean" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  titleEn: "", titleAr: "", slug: "", shortSummaryEn: "", shortSummaryAr: "",
  category: "", githubLink: "", liveDemoLink: "", kaggleLink: "", modelUsed: "",
  tools: [], evaluationMetrics: [], thumbnail: "", screenshots: [], displayOrder: 0,
  homepageCategoryOrder: 0, featuredOnHomepage: false, visible: true
};

export default function ProjectsAdminPage() {
  return <ItemsManager title="Projects" apiPath="/api/projects" itemKey="projects" fields={fields} blank={blank} />;
}
