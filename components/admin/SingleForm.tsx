"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RenderArgs {
  data: any;
  setValue: (key: string, value: any) => void;
  setData: (updater: (prev: any) => any) => void;
}

interface SingleFormProps {
  title: string;
  apiPath: string;
  children: React.ReactNode | ((args: RenderArgs) => React.ReactNode);
  onSaved?: (data: any) => void;
}

export function SingleForm({ title, apiPath, children, onSaved }: SingleFormProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    fetch(apiPath, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        const record = d.data || d.profile || d.settings || d.theme || d;
        setData({ ...(record && typeof record === "object" ? record : {}) });
      })
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, [apiPath]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(apiPath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const response = await res.json().catch(() => ({}));
        onSaved?.(response.data || response.profile || response.settings || response);
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2500);
      }
    } finally {
      setSaving(false);
    }
  };

  const setValue = (key: string, value: any) =>
    setData((prev: any) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          {savedMsg && (
            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
              <CheckCircle2 className="h-4 w-4" /> Saved
            </span>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>
      {typeof children === "function" ? children({ data, setValue, setData }) : children}
    </div>
  );
}

export default SingleForm;
