import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { toPlainObject } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const { id } = await params;
  const body = await readSanitizedJsonObject(request);
  const item = await Skill.findByIdAndUpdate(id, { $set: body }, { new: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await logAuditEvent({ action: "skillupdate", entityType: "Skill", entityId: id, success: true });
  await revalidatePortfolio();
  return NextResponse.json({ item: toPlainObject(item.toObject()) });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const { id } = await params;
  await Skill.findByIdAndDelete(id);
  await logAuditEvent({ action: "skilldelete", entityType: "Skill", entityId: id, success: true });
  await revalidatePortfolio();
  return NextResponse.json({ ok: true });
}
