import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { toPlainObject } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin") === "true";
  const unauthorized = admin ? await requireAuth(request) : null;
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const items = await Skill.find(admin ? {} : { visible: true }).sort({ order: 1 }).lean();
  return NextResponse.json({ items: toPlainObject(items) });
}

export async function POST(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);
  const item = await Skill.create(body);
  await logAuditEvent({ action: "skillcreate", entityType: "Skill", entityId: String(item._id), success: true });
  await revalidatePortfolio();
  return NextResponse.json({ item: toPlainObject(item.toObject()) });
}
