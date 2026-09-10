import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { toPlainObject, slugify } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin") === "true";

  if (admin) {
    const unauthorized = await requireAuth(request);
    if (unauthorized) return unauthorized;
    await connectToDatabase();
    const projects = await Project.find().sort({ displayOrder: 1 }).lean();
    return NextResponse.json({ projects: toPlainObject(projects) });
  }

  await connectToDatabase();
  const projects = await Project.find({ visible: true, featuredOnHomepage: true })
    .sort({ homepageCategoryOrder: 1, displayOrder: 1 })
    .lean();
  return NextResponse.json({ projects: toPlainObject(projects) });
}

export async function POST(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();

  const body = await readSanitizedJsonObject(request);
  const titleEn = String(body.titleEn || "");
  if (!titleEn) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = String(body.slug || slugify(titleEn));
  const existing = await Project.findOne({ slug });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const project = await Project.create({ ...body, slug: finalSlug });

  await logAuditEvent({
    action: "project.create",
    entityType: "Project",
    entityId: String(project._id),
    success: true
  });
  await revalidatePortfolio();

  return NextResponse.json({ project: toPlainObject(project.toObject()) });
}
