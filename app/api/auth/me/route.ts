import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)portfolio_admin_token=([^;]*)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({ authenticated: true, username: payload.username });
}
