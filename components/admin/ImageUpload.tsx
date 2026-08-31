"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export function ImageUpload({ label, value, onChange, accept = "image/*" }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
        onChange(data.url);
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

  const isImage = accept.startsWith("image/");

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      {value ? (
        <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="h-20 w-20 rounded object-cover" />
          ) : (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
          <div className="flex-1">
            <p className="truncate text-xs text-muted-foreground">{value}</p>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="h-3.5 w-3.5" /> Replace
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onChange("")} className="text-red-600">
                <X className="h-3.5 w-3.5" /> Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <ImageIcon className="h-5 w-5" />
              <span className="text-xs">{label} — click to upload</span>
            </>
          )}
        </button>
      )}
      <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
