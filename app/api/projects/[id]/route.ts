import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
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
  const project = await Project.findByIdAndUpdate(id, { $set: body }, { new: true });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await logAuditEvent({
    action: "project.update",
    entityType: "Project",
    entityId: id,
    success: true
  });
  await revalidatePortfolio();

  return NextResponse.json({ project: toPlainObject(project.toObject()) });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const { id } = await params;

  await Project.findByIdAndDelete(id);

  await logAuditEvent({
    action: "project.delete",
    entityType: "Project",
    entityId: id,
    success: true
  });
  await revalidatePortfolio();

  return NextResponse.json({ ok: true });
}
