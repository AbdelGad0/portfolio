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

if (/^https?:\/\//i.test(cvFile)) {
    return NextResponse.redirect(cvFile);
  }

  if (cvFile.startsWith("/") && !cvFile.startsWith("//")) {
    return NextResponse.redirect(
      new URL(cvFile, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
    );
  }

  return NextResponse.json({ error: "CV not available" }, { status: 404 });
}
