import { NextResponse } from "next/server";
import { ensureResolvableDns } from "@/lib/dns";

export async function GET() {
  ensureResolvableDns();
  const username = process.env.GITHUB_USERNAME || "AbdelGad0";
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("GitHub API error");
    const repos = await res.json();
    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ repos: [] }, { status: 502 });
  }
}
