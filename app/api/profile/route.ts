import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { toPlainObject } from "@/lib/utils";
import { revalidatePortfolio } from "@/lib/revalidate";

export async function GET() {
  await connectToDatabase();
  const profile = await Profile.findOne().sort({ _id: 1 }).lean();
  return NextResponse.json({ data: toPlainObject(profile) || {} });
}

export async function PUT(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  let profile = await Profile.findOne().sort({ _id: 1 });
  if (!profile) {
    profile = new Profile(body);
  } else {
    Object.assign(profile, body);
  }
await profile.save();
  await revalidatePortfolio();
  return NextResponse.json({ data: toPlainObject(profile.toObject()) });
}
