import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { authenticateAdminCredential, ensureAdminCredential } from "@/lib/admin-credentials";
import { createToken } from "@/lib/auth";
import { logAuditEvent } from "@/lib/audit-log";
import { readSanitizedJsonObject, getRequestIp, getUserAgent } from "@/lib/security";

function readCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function isCsrfValid(request: Request): boolean {
  const headerToken = request.headers.get("x-csrf-token");
  const cookieToken = readCookieValue(request.headers.get("cookie"), "portfolio_csrf");
  return Boolean(headerToken && cookieToken && headerToken === cookieToken);
}

export async function POST(request: Request) {
  if (!isCsrfValid(request)) {
    return NextResponse.json({ error: "Invalid or missing CSRF token" }, { status: 403 });
  }

  await connectToDatabase();
  await ensureAdminCredential();

  const body = await readSanitizedJsonObject(request);
  const username = String(body.username || "");
  const password = String(body.password || "");
  const ip = getRequestIp(request);
  const ua = getUserAgent(request);

  const result = await authenticateAdminCredential(username, password);

  await logAuditEvent({
    action: "admin.login",
    entityType: "AdminCredential",
    actorUsername: username,
    ipAddress: ip,
    userAgent: ua,
    success: result.ok
  });

  if (!result.ok) {
    if (result.locked) {
      return NextResponse.json({ error: result.message }, { status: 429 });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createToken({ sub: username, username });

  const response = NextResponse.json({ ok: true, username });
  response.cookies.set("portfolio_admin_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
