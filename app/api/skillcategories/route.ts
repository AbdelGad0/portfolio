import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SkillCategory from "@/models/SkillCategory";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { toPlainObject, slugify } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin") === "true";
  const unauthorized = admin ? await requireAuth(request) : null;
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const items = await SkillCategory.find(admin ? {} : { visible: true }).sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ items: toPlainObject(items) });
}

export async function POST(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);
  const nameEn = String(body.nameEn || "");
  const slug = String(body.slug || slugify(nameEn || "category"));
  const item = await SkillCategory.create({ ...body, slug });
  await logAuditEvent({ action: "skillcategory.create", entityType: "SkillCategory", entityId: String(item._id), success: true });
  await revalidatePortfolio();
  return NextResponse.json({ item: toPlainObject(item.toObject()) });
}
