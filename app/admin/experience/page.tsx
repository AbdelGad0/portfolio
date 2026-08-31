"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "titleEn", label: "Role (EN)", full: true },
  { key: "titleAr", label: "Role (AR)", full: true },
  { key: "companyEn", label: "Company (EN)" },
  { key: "companyAr", label: "Company (AR)" },
  { key: "durationEn", label: "Duration (EN)" },
  { key: "durationAr", label: "Duration (AR)" },
  { key: "bulletsEn", label: "Bullets (EN, comma separated)", type: "array", full: true },
  { key: "bulletsAr", label: "Bullets (AR, comma separated)", type: "array", full: true },
  { key: "tools", label: "Tools (comma separated)", type: "array", full: true },
  { key: "current", label: "Current position", type: "boolean" },
  { key: "order", label: "Order", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  titleEn: "", titleAr: "", companyEn: "", companyAr: "", durationEn: "",
  durationAr: "", bulletsEn: [], bulletsAr: [], tools: [], current: false,
  order: 0, visible: true
};

export default function ExperienceAdminPage() {
  return <ItemsManager title="Experience" apiPath="/api/experience" itemKey="items" fields={fields} blank={blank} />;
}
