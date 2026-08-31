import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/models/Message";
import { readSanitizedJsonObject } from "@/lib/security";

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await readSanitizedJsonObject(request);

  const name = String(body.name || "").slice(0, 100);
  const email = String(body.email || "").toLowerCase().slice(0, 254);
  const subject = String(body.subject || "").slice(0, 200);
  const message = String(body.message || "").slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  await Message.create({ name, email, subject, message });
  return NextResponse.json({ ok: true });
}
