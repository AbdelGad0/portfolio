"use client";

import { useState, useEffect, useRef } from "react";
import { Pencil, Plus, Trash2, X, Save, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ImageUpload } from "./ImageUpload";
import { ImageArrayUpload } from "./ImageArrayUpload";

export interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean" | "select" | "array" | "image" | "images";
  placeholder?: string;
  options?: string[];
  rows?: number;
  full?: boolean;
}

interface ItemsManagerProps {
  title: string;
  apiPath: string;
  itemKey: string;
  fields: FieldDef[];
  blank: Record<string, any>;
}

export function ItemsManager({ title, apiPath, itemKey, fields, blank }: ItemsManagerProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const loadedRef = useRef(false);

  const load = async () => {
    try {
      const res = await fetch(`${apiPath}?admin=true`);
      const data = await res.json();
      setItems(data[itemKey] || data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...blank });
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item._id);
    setForm({ ...item });
    setOpen(true);
  };

  const handleSubmit = async () => {
    const url = editingId ? `${apiPath}/${editingId}` : apiPath;
    const method = editingId ? "PUT" : "POST";
    const internal = ["_id", "__v", "createdAt", "updatedAt", "timestamps"];
    const payload = Object.fromEntries(
      Object.entries(form || {}).filter(([k]) => !internal.includes(k))
    );
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setOpen(false);
      await load();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    if (res.ok) await load();
  };

  const setField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const displayTitle = (item: any) =>
    item.titleEn || item.nameEn || item.degreeEn || item.name || item.subject || item._id;
  const displaySub = (item: any) =>
    item.shortSummaryEn || item.slug || item.institutionEn || item.email || item.issuer || "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-lg border bg-card p-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{displayTitle(item)}</p>
                  <p className="truncate text-xs text-muted-foreground">{displaySub(item)}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEdit(item)} aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-700"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit" : "Add"} {title.toLowerCase()}
            </DialogTitle>
            <DialogDescription>Fill in the fields below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.full ? "sm:col-span-2" : ""}>
                <Label>{field.label}</Label>
                <FieldInput
                  field={field}
                  value={form[field.key] ?? ""}
                  onChange={(v) => setField(field.key, v)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange
}: {
  field: FieldDef;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === "textarea") {
    return (
      <Textarea
        rows={field.rows || 3}
        value={value || ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-2 h-4 w-4"
      />
    );
  }
  if (field.type === "select") {
    return (
<select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground"
      >
        {(field.options || []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "array") {
    return <StringArrayInput value={value} onChange={onChange} />;
  }
  if (field.type === "images") {
    return <ImageArrayUpload label={field.label} value={value || []} onChange={onChange} />;
  }
  if (field.type === "image") {
    return <ImageUpload label={field.label} value={value || ""} onChange={onChange} />;
  }
  return (
    <Input
      value={value || ""}
      placeholder={field.placeholder}
      type={field.type || "text"}
      onChange={(e) =>
        onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
      }
    />
  );
}

function StringArrayInput({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  const [text, setText] = useState((Array.isArray(value) ? value : []).join(", "));
  const handleBlur = () => {
    onChange(text.split(",").map((s) => s.trim()).filter(Boolean));
  };
  return (
    <Input
      value={text}
      placeholder="Comma separated values"
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
    />
  );
}
