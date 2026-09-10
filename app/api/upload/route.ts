import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import { saveFile } from "@/lib/storage";

export async function POST(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const fileField = formData.get("file");
    const subdir = String(formData.get("subdir") || "general");

    if (!(fileField instanceof File) || !fileField.name) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const result = await saveFile(fileField, subdir);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 400 }
    );
  }
}
