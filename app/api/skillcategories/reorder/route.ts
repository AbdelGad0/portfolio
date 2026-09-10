import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SkillCategory from "@/models/SkillCategory";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function PUT(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);
  const ids = Array.isArray(body.ids) ? body.ids.map(String) : [];
  for (let i = 0; i < ids.length; i++) {
    await SkillCategory.updateOne({ _id: ids[i] }, { $set: { sortOrder: i } });
  }
  await logAuditEvent({ action: "skillcategory.reorder", entityType: "SkillCategory", success: true });
  await revalidatePortfolio();
  return NextResponse.json({ ok: true });
}
