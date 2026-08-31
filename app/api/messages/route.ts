import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/models/Message";
import { requireAuth } from "@/lib/apiAuth";
import { toPlainObject } from "@/lib/utils";

export async function GET(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  await connectToDatabase();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ messages: toPlainObject(messages) });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await Message.updateOne({ _id: id }, { $set: { read: true } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await Message.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
