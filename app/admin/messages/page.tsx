"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Trash2, CheckCheck, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loadedRef = useRef(false);

  const load = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  };

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    load();
  }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/messages?id=${id}`, { method: "PUT" });
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Messages</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : messages.length === 0 ? (
        <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">
          <Inbox className="mx-auto mb-2 h-8 w-8" />
          <p className="text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg._id} className={"rounded-lg border bg-card p-4 shadow-sm " + (!msg.read ? "border-primary/50" : "")}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{msg.name}</span>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-600">{msg.email}</a>
                    <span className="text-xs text-muted-foreground">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
                    </span>
                  </div>
                  {msg.subject && <p className="mt-1 text-sm font-medium text-primary">{msg.subject}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {!msg.read && (
                    <Button variant="ghost" size="icon" onClick={() => markRead(msg._id)} aria-label="Mark read">
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => remove(msg._id)} className="text-red-600" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
