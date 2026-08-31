"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function isImage(url: string) {
  return /\.(jpe?g|png|webp|gif)$/i.test(url);
}

export default function MediaAdminPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadedRef = useRef(false);

  const load = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    load();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) await load();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch { /* ignore */ }
  };

  const remove = async (url: string) => {
    if (!window.confirm("Delete this file?")) return;
    await fetch(`/api/media?url=${encodeURIComponent(url)}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Media Library</h1>
        <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload
        </Button>
      </div>
      <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((f) => (
            <div key={f.url} className="rounded-lg border bg-card p-2 shadow-sm">
              <div className="flex h-32 items-center justify-center overflow-hidden rounded bg-muted/40">
                {isImage(f.url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.url} alt={f.filename} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-muted-foreground">{f.filename}</span>
                )}
              </div>
              <p className="mt-2 truncate px-1 text-xs text-muted-foreground">{f.filename}</p>
              <div className="mt-2 flex items-center justify-between gap-1 border-t pt-2">
                <Button variant="ghost" size="sm" onClick={() => copyUrl(f.url)}>
                  {copied === f.url ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span className="ml-1 text-xs">{copied === f.url ? "Copied" : "Copy"}</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(f.url)} className="text-red-600" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
