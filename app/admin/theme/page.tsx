"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, Loader2, Save as SaveIcon, CheckCircle2 } from "lucide-react";
import { buildThemeStyle } from "@/lib/content/theme-settings";

const colorThemes = [
  "default", "emerald-pro", "blue-tech", "purple-ai", "cyan-data", "amber-minimal", "monochrome", "neon-dark"
];

const themeLabels: Record<string, string> = {
  "default": "Default",
  "emerald-pro": "Emerald Pro",
  "blue-tech": "Blue Tech",
  "purple-ai": "Purple AI",
  "cyan-data": "Cyan Data",
  "amber-minimal": "Amber Minimal",
  "monochrome": "Monochrome",
  "neon-dark": "Neon Dark"
};

const APPEARANCE_KEYS = ["radius", "cardStyle", "typographyScale", "sectionSpacing"] as const;
type Appearance = Record<(typeof APPEARANCE_KEYS)[number], string>;

const APPEARANCE_DEFAULTS: Appearance = {
  radius: "soft",
  cardStyle: "premium",
  typographyScale: "balanced",
  sectionSpacing: "normal"
};

const APPEARANCE_ATTRS: Record<keyof Appearance, string> = {
  radius: "data-radius-style",
  cardStyle: "data-card-style",
  typographyScale: "data-typography-scale",
  sectionSpacing: "data-section-spacing"
};

function applyColorPreview(theme: string) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.setAttribute("data-color-theme", theme);
  const style = buildThemeStyle(theme);
  Object.entries(style).forEach(([key, value]) => {
    el.style.setProperty(key, String(value ?? ""));
  });
}

function applyAppearancePreview(app: Appearance) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  Object.entries(APPEARANCE_ATTRS).forEach(([key, attr]) => {
    el.setAttribute(attr, app[key as keyof Appearance]);
  });
}

export default function ThemeAdminPage() {
  const [loading, setLoading] = useState(true);
  const [colorTheme, setColorTheme] = useState<string>("purple-ai");
  const [savedTheme, setSavedTheme] = useState<string | null>(null);
  const [appearance, setAppearance] = useState<Appearance>({ ...APPEARANCE_DEFAULTS });
  const [savedAppearance, setSavedAppearance] = useState<Appearance | null>(null);
  const [savingTheme, setSavingTheme] = useState(false);
  const [savingAppearance, setSavingAppearance] = useState(false);
  const [savedThemeMsg, setSavedThemeMsg] = useState(false);
  const [savedAppearanceMsg, setSavedAppearanceMsg] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    fetch("/api/theme-settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        const t = d.theme || d.data || d;
        const theme = t.colorTheme || "purple-ai";
        setColorTheme(theme);
        setSavedTheme(theme);
        const app: Appearance = {
          radius: t.radius || APPEARANCE_DEFAULTS.radius,
          cardStyle: t.cardStyle || APPEARANCE_DEFAULTS.cardStyle,
          typographyScale: t.typographyScale || APPEARANCE_DEFAULTS.typographyScale,
          sectionSpacing: t.sectionSpacing || APPEARANCE_DEFAULTS.sectionSpacing
        };
        setAppearance(app);
        setSavedAppearance({ ...app });
        applyColorPreview(theme);
        applyAppearancePreview(app);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saveTheme = async () => {
    setSavingTheme(true);
    try {
      const res = await fetch("/api/theme-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ colorTheme })
      });
      if (res.ok) {
        setSavedTheme(colorTheme);
        setSavedThemeMsg(true);
        setTimeout(() => setSavedThemeMsg(false), 2500);
      }
    } finally {
      setSavingTheme(false);
    }
  };

  const saveAppearance = async () => {
    setSavingAppearance(true);
    try {
      const res = await fetch("/api/theme-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...appearance })
      });
      if (res.ok) {
        setSavedAppearance({ ...appearance });
        setSavedAppearanceMsg(true);
        setTimeout(() => setSavedAppearanceMsg(false), 2500);
      }
    } finally {
      setSavingAppearance(false);
    }
  };

  const restoreTheme = () => {
    if (!savedTheme) return;
    setColorTheme(savedTheme);
    applyColorPreview(savedTheme);
  };

  const restoreAppearance = () => {
    if (!savedAppearance) return;
    setAppearance({ ...savedAppearance });
    applyAppearancePreview(savedAppearance);
  };

  const changeTheme = (t: string) => {
    setColorTheme(t);
    applyColorPreview(t);
  };

  const changeAppearance = (key: keyof Appearance, value: string) => {
    const next = { ...appearance, [key]: value };
    setAppearance(next);
    applyAppearancePreview(next);
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">Theme & Branding</h1>
        <span className="text-xs text-muted-foreground">Theme and Appearance are saved & restored independently.</span>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-dashed bg-primary/5 px-4 py-2.5 text-xs text-muted-foreground">
        <Eye className="h-4 w-4 text-primary" />
        Choosing any option applies a live preview right away. Press <b className="mx-1">Save</b> for that section to keep it on the whole site, or <b className="mx-1">Restore</b> to go back to that section&apos;s previous value.
      </div>

      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Color Theme</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colorThemes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => changeTheme(t)}
              className={
                "rounded-lg border p-3 text-left text-sm font-medium transition-colors " +
                (colorTheme === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "hover:border-primary/40")
              }
            >
              {themeLabels[t]}
            </button>
          ))}
        </div>
        <ActionBar
          saveLabel="Save theme"
          saving={savingTheme}
          saved={savedThemeMsg}
          onSave={saveTheme}
          onRestore={restoreTheme}
          canRestore={!!savedTheme}
        />
      </section>

      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Appearance Controls</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Radius</Label>
            <select value={appearance.radius} onChange={(e) => changeAppearance("radius", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
              <option value="soft">Soft</option>
              <option value="rounded">Rounded</option>
              <option value="sharp">Sharp</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Card style</Label>
            <select value={appearance.cardStyle} onChange={(e) => changeAppearance("cardStyle", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
              <option value="premium">Premium</option>
              <option value="glass">Glass</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Typography scale</Label>
            <select value={appearance.typographyScale} onChange={(e) => changeAppearance("typographyScale", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
              <option value="compact">Compact</option>
              <option value="balanced">Balanced</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Section spacing</Label>
            <select value={appearance.sectionSpacing} onChange={(e) => changeAppearance("sectionSpacing", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
              <option value="tight">Tight</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>
        </div>
        <ActionBar
          saveLabel="Save appearance"
          saving={savingAppearance}
          saved={savedAppearanceMsg}
          onSave={saveAppearance}
          onRestore={restoreAppearance}
          canRestore={!!savedAppearance}
        />
      </section>
    </div>
  );
}

function ActionBar({
  saveLabel,
  saving,
  saved,
  onSave,
  onRestore,
  canRestore
}: {
  saveLabel: string;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  onRestore: () => void;
  canRestore: boolean;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-dashed bg-muted/20 px-4 py-3">
      <Button type="button" onClick={onSave} disabled={saving} className="gap-2">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
        {saveLabel}
      </Button>
      <Button type="button" variant="outline" onClick={onRestore} disabled={!canRestore} className="gap-2">
        <RotateCcw className="h-4 w-4" /> Restore
      </Button>
      {saved && (
        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
          <CheckCircle2 className="h-4 w-4" /> Saved
        </span>
      )}
      <span className="ml-auto text-xs text-muted-foreground sm:text-right">
        Preview is live right away — Save applies this section to the whole site.
      </span>
    </div>
  );
}