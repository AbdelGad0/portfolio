"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "nameEn", label: "Name (EN)", full: true },
  { key: "nameAr", label: "Name (AR)", full: true },
  { key: "category", label: "Category" },
  { key: "icon", label: "Icon" },
  { key: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
  { key: "order", label: "Order", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  nameEn: "", nameAr: "", category: "", icon: "", level: "Intermediate",
  order: 0, visible: true
};

export default function SkillsAdminPage() {
  return <ItemsManager title="Skills" apiPath="/api/skills" itemKey="items" fields={fields} blank={blank} />;
}
