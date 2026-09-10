import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/models/Message";
import { readSanitizedJsonObject, getRequestIp } from "@/lib/security";
import { sendContactEmail } from "@/lib/mail";

const IP_LIMIT = 5;
const IP_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_LIMIT = 3;
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000;

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

  const ip = getRequestIp(request);
  const [ipCount, emailCount] = await Promise.all([
    Message.countDocuments({
      ipAddress: ip,
      createdAt: { $gte: new Date(Date.now() - IP_WINDOW_MS) }
    }),
    Message.countDocuments({
      email,
      createdAt: { $gte: new Date(Date.now() - EMAIL_WINDOW_MS) }
    })
  ]);

  if (ipCount >= IP_LIMIT) {
    return NextResponse.json(
      { error: "Too many messages from your connection. Please try again later." },
      { status: 429 }
    );
  }

  if (emailCount >= EMAIL_LIMIT) {
    return NextResponse.json(
      { error: "Too many messages from this email address. Please try again later." },
      { status: 429 }
    );
  }

  await Message.create({ name, email, subject, message, ipAddress: ip });
  await sendContactEmail({ name, email, subject, message });
  return NextResponse.json({ ok: true });
}
