import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryGroup from "@/models/CategoryGroup";
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
    const items = await CategoryGroup.find().sort({ sortOrder: 1 }).lean();
    return NextResponse.json({ categories: toPlainObject(items) });
  }

  await connectToDatabase();
  const items = await CategoryGroup.find({ visible: true }).sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ categories: toPlainObject(items) });
}

export async function POST(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();

  const body = await readSanitizedJsonObject(request);
  const name = String(body.name || "");
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const slug = String(body.slug || slugify(name));
  const item = await CategoryGroup.create({ ...body, slug });

  await logAuditEvent({ action: "category.create", entityType: "CategoryGroup", entityId: String(item._id), success: true });
  await revalidatePortfolio();
  return NextResponse.json({ category: toPlainObject(item.toObject()) });
}
