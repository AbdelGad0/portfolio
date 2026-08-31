"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "name", label: "Name", full: true },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description", type: "textarea", rows: 3, full: true },
  { key: "sortOrder", label: "Sort order", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  name: "", slug: "", description: "", sortOrder: 0, visible: true
};

export default function CategoriesAdminPage() {
  return (
    <ItemsManager
      title="Category Groups"
      apiPath="/api/categories"
      itemKey="categories"
      fields={fields}
      blank={blank}
    />
  );
}
