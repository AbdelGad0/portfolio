"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BilingualFieldProps {
  label: string;
  valueEn: string;
  valueAr: string;
  onChangeEn: (v: string) => void;
  onChangeAr: (v: string) => void;
  type?: "text" | "textarea" | "number";
  placeholderEn?: string;
  placeholderAr?: string;
  rows?: number;
  full?: boolean;
}

export function BilingualField({
  label,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  type = "text",
  placeholderEn,
  placeholderAr,
  rows,
  full
}: BilingualFieldProps) {
  const cls = full ? "sm:col-span-2" : "";
  const base = "space-y-1";
  return (
    <div className={`${cls} space-y-2`}>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className={base}>
          <Label className="text-[10px] text-muted-foreground/70">English</Label>
          {type === "textarea" ? (
            <Textarea rows={rows || 3} value={valueEn || ""} placeholder={placeholderEn} onChange={(e) => onChangeEn(e.target.value)} dir="ltr" />
          ) : (
            <Input type={type} value={valueEn || ""} placeholder={placeholderEn} onChange={(e) => onChangeEn(type === "number" ? String(e.target.value) : e.target.value)} dir="ltr" />
          )}
        </div>
        <div className={base}>
          <Label className="text-[10px] text-muted-foreground/70">عربي</Label>
          {type === "textarea" ? (
            <Textarea rows={rows || 3} value={valueAr || ""} placeholder={placeholderAr} onChange={(e) => onChangeAr(e.target.value)} dir="rtl" />
          ) : (
            <Input type={type} value={valueAr || ""} placeholder={placeholderAr} onChange={(e) => onChangeAr(type === "number" ? String(e.target.value) : e.target.value)} dir="rtl" />
          )}
        </div>
      </div>
    </div>
  );
}
