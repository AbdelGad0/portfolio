"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "degreeEn", label: "Degree (EN)", full: true },
  { key: "degreeAr", label: "Degree (AR)", full: true },
  { key: "institutionEn", label: "Institution (EN)" },
  { key: "institutionAr", label: "Institution (AR)" },
  { key: "fieldOfStudyEn", label: "Field of study (EN)" },
  { key: "fieldOfStudyAr", label: "Field of study (AR)" },
  { key: "startDate", label: "Start date" },
  { key: "endDate", label: "End date" },
  { key: "grade", label: "Grade" },
  { key: "logo", label: "Logo", type: "image" },
  { key: "order", label: "Order", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  degreeEn: "", degreeAr: "", institutionEn: "", institutionAr: "",
  fieldOfStudyEn: "", fieldOfStudyAr: "", startDate: "", endDate: "",
  grade: "", logo: "", order: 0, visible: true
};

export default function EducationAdminPage() {
  return <ItemsManager title="Education" apiPath="/api/education" itemKey="items" fields={fields} blank={blank} />;
}
