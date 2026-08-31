import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET() {
  await connectToDatabase();
  const profile = await Profile.findOne().lean<{ cvFile?: string }>();
  const cvFile = profile?.cvFile;

  if (!cvFile) {
    return NextResponse.json({ error: "CV not available" }, { status: 404 });
  }

  if (cvFile.startsWith("http")) {
    return NextResponse.redirect(cvFile);
  }

  return NextResponse.redirect(new URL(cvFile, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}
