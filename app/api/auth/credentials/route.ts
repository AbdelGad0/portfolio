import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import AdminCredential from "@/models/AdminCredential";
import { requireAuth } from "@/lib/apiAuth";
import { verifyAdminCredentialPassword } from "@/lib/admin-credentials";
import { logAuditEvent } from "@/lib/audit-log";
import { readSanitizedJsonObject, getRequestIp, getUserAgent } from "@/lib/security";

export async function GET(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  await connectToDatabase();
  const credential = await AdminCredential.findOne()
    .select("username mustChangePassword")
    .lean<{ username?: string; mustChangePassword?: boolean }>();
  return NextResponse.json({
    username: credential?.username || "",
    mustChangePassword: credential?.mustChangePassword || false
  });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);
  const username = String(body.username || "");
  const currentPassword = String(body.currentPassword || "");
  const password = String(body.password || "");

  if (!username || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Username and password (min 8 chars) are required" },
      { status: 400 }
    );
  }

  if (!currentPassword) {
    return NextResponse.json(
      { error: "Current password is required" },
      { status: 400 }
    );
  }

  const verified = await verifyAdminCredentialPassword(currentPassword);
  if (!verified) {
    await logAuditEvent({
      action: "admin.credentials.rejected",
      entityType: "AdminCredential",
      actorUsername: username,
      ipAddress: getRequestIp(request),
      userAgent: getUserAgent(request),
      success: false,
      details: { reason: "incorrect current password" }
    });
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 403 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminCredential.updateOne(
    {},
    { $set: { username, passwordHash, mustChangePassword: false } },
    { upsert: true }
  );

  await logAuditEvent({
    action: "admin.credentials.update",
    entityType: "AdminCredential",
    actorUsername: username,
    ipAddress: getRequestIp(request),
    userAgent: getUserAgent(request),
    success: true
  });

  return NextResponse.json({ ok: true });
}
