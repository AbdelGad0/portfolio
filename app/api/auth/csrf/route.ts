import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET() {
  const token = randomBytes(32).toString("hex");
  const response = NextResponse.json({ token });
  response.cookies.set("portfolio_csrf", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 3600
  });
  return response;
}