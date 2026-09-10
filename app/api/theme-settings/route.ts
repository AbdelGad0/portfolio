import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ThemeSettings from "@/models/ThemeSettings";
import { requireAuth } from "@/lib/apiAuth";
import { readSanitizedJsonObject } from "@/lib/security";
import { toPlainObject } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";
import { logAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  let theme = await ThemeSettings.findOne().lean();
  if (!theme) {
    theme = await ThemeSettings.create({});
  }
  return NextResponse.json({ theme: toPlainObject(theme) });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);
  let theme = await ThemeSettings.findOne();
  if (!theme) {
    theme = await ThemeSettings.create(body);
  } else {
    theme = await ThemeSettings.findByIdAndUpdate(theme._id, { $set: body }, { new: true });
  }
  await logAuditEvent({ action: "theme.update", entityType: "ThemeSettings", entityId: String(theme?._id), success: true });
  await revalidatePortfolio();
  return NextResponse.json({ theme: toPlainObject(theme?.toObject()) });
}
