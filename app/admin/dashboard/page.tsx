"use client";

import { useEffect, useRef, useState } from "react";
import { FolderKanban, Layers, MessageSquare, Award, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, certifications: 0, unread: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    (async () => {
      try {
        const [p, s, c, m] = await Promise.all([
          fetch("/api/projects?admin=true").then((r) => r.json()),
          fetch("/api/skills?admin=true").then((r) => r.json()),
          fetch("/api/certifications?admin=true").then((r) => r.json()),
          fetch("/api/messages").then((r) => r.json())
        ]);
        setStats({
          projects: (p.projects || []).length,
          skills: (s.items || []).length,
          certifications: (c.items || []).length,
          unread: (m.messages || []).filter((x: any) => !x.read).length
        });
        setRecent((m.messages || []).slice(0, 5));
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban, href: "/admin/projects" },
    { label: "Skills", value: stats.skills, icon: Layers, href: "/admin/skills" },
    { label: "Certifications", value: stats.certifications, icon: Award, href: "/admin/certifications" },
    { label: "Unread messages", value: stats.unread, icon: MessageSquare, href: "/admin/messages" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your portfolio content</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
            <card.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-2xl font-bold">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-sm font-semibold">Recent messages</h2>
          <Link href="/admin/messages" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          <ul className="divide-y">
            {recent.map((msg) => (
              <li key={msg._id} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate text-sm font-medium">
                    {!msg.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    {msg.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{msg.subject || "No subject"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
