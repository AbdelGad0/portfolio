import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { toPlainObject } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return NextResponse.json({ settings: toPlainObject(settings) });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(body);
  } else {
    settings = await SiteSettings.findByIdAndUpdate(settings._id, { $set: body }, { new: true });
  }
  await logAuditEvent({ action: "settings.update", entityType: "SiteSettings", entityId: String(settings?._id), success: true });
  await revalidatePortfolio();
  return NextResponse.json({ settings: toPlainObject(settings?.toObject()) });
}
