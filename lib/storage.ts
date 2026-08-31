import "server-only";
import { put, list, del } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

export interface UploadResult {
  url: string;
  filename: string;
}

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function saveFile(
  file: File,
  subdir: string
): Promise<UploadResult> {
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error("Unsupported file type");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("File too large (max 10MB)");
  }

  const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  if (process.env.VERCEL) {
    const blob = await put(`${subdir}/${filename}`, file, {
      access: "public"
    });
    return { url: blob.url, filename: blob.pathname };
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", subdir);
  await fs.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return { url: `/uploads/${subdir}/${filename}`, filename };
}

export async function listFiles(): Promise<{ url: string; filename: string }[]> {
  if (process.env.VERCEL) {
    const { blobs } = await list();
    return blobs.map((b) => ({ url: b.url, filename: b.pathname }));
  }
  const uploadRoot = path.join(process.cwd(), "public", "uploads");
  const results: { url: string; filename: string }[] = [];
  try {
    const subdirs = await fs.readdir(uploadRoot);
    for (const subdir of subdirs) {
      const dir = path.join(uploadRoot, subdir);
      const files = await fs.readdir(dir);
      for (const f of files) {
        results.push({ url: `/uploads/${subdir}/${f}`, filename: f });
      }
    }
  } catch {
    // no uploads yet
  }
  return results;
}

export async function deleteStoredFile(url: string): Promise<void> {
  if (process.env.VERCEL) {
    await del(url);
    return;
  }
  const base = path.join(process.cwd(), "public");
  const relative = url.replace(/^\//, "");
  const filePath = path.join(base, relative);
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore missing
  }
}
