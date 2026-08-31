"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "nameEn", label: "Name (EN)", full: true },
  { key: "nameAr", label: "Name (AR)", full: true },
  { key: "slug", label: "Slug" },
  { key: "icon", label: "Icon" },
  { key: "descriptionEn", label: "Description (EN)", type: "textarea", rows: 2, full: true },
  { key: "descriptionAr", label: "Description (AR)", type: "textarea", rows: 2, full: true },
  { key: "sortOrder", label: "Sort order", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  nameEn: "", nameAr: "", slug: "", icon: "", descriptionEn: "",
  descriptionAr: "", sortOrder: 0, visible: true
};

export default function SkillCategoriesAdminPage() {
  return <ItemsManager title="Skill Categories" apiPath="/api/skillcategories" itemKey="items" fields={fields} blank={blank} />;
}
