import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export async function requireAuth(req: Request): Promise<NextResponse | null> {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)portfolio_admin_token=([^;]*)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
