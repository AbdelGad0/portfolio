"use client";

import { ItemsManager, type FieldDef } from "@/components/admin/ItemsManager";

const fields: FieldDef[] = [
  { key: "nameEn", label: "Name (EN)", full: true },
  { key: "nameAr", label: "Name (AR)", full: true },
  { key: "issuer", label: "Issuer" },
  { key: "date", label: "Date" },
  { key: "credentialUrl", label: "Credential URL", full: true },
  { key: "badge", label: "Badge", type: "image" },
  { key: "featured", label: "Featured", type: "boolean" },
  { key: "order", label: "Order", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" }
];

const blank = {
  nameEn: "", nameAr: "", issuer: "", date: "", credentialUrl: "",
  badge: "", featured: false, order: 0, visible: true
};

export default function CertificationsAdminPage() {
  return <ItemsManager title="Certifications" apiPath="/api/certifications" itemKey="items" fields={fields} blank={blank} />;
}
