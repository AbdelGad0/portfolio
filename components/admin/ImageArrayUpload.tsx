"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, X, ImageIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageArrayUploadProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ImageArrayUpload({ label, value, onChange }: ImageArrayUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const urls = Array.isArray(value) ? value : [];

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    setError("");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        onChange([...urls, data.url]);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    onChange(urls.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...urls];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    const tmp = next[index];
    next[index] = next[target];
    next[target] = tmp;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {urls.map((url, i) => (
          <div key={url + i} className="relative h-24 w-24 overflow-hidden rounded-lg border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`${label} ${i + 1}`} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 p-0.5">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="p-0.5 text-white disabled:opacity-30 hover:text-primary"
                aria-label="Move left"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="p-0.5 text-white hover:text-red-400"
                aria-label="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === urls.length - 1}
                className="p-0.5 text-white disabled:opacity-30 hover:text-primary"
                aria-label="Move right"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-2.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        {uploading ? "Uploading..." : urls.length === 0 ? "Click to add images" : "Add another image"}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      <p className="text-[11px] text-muted-foreground">
        Order matters: the first image appears at the top. Use the arrows to reorder.
      </p>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onChange([])}
        className="text-red-600 hover:text-red-700"
      >
        Clear all
      </Button>
    </div>
  );
}