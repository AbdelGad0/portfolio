import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import { listFiles, deleteStoredFile } from "@/lib/storage";

export async function GET(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  const files = await listFiles();
  return NextResponse.json({ files });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  await deleteStoredFile(url);
  return NextResponse.json({ ok: true });
}
