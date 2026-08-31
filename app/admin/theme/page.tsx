"use client";

import SingleForm from "@/components/admin/SingleForm";
import { Label } from "@/components/ui/label";

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

export default function ThemeAdminPage() {
  return (
    <div className="space-y-6">
      <SingleForm title="Theme & Branding" apiPath="/api/theme-settings">
        {({ data, setValue }) => (
          <div className="space-y-6">
            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Color Theme</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {colorThemes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValue("colorTheme", t)}
                    className={
                      "rounded-lg border p-3 text-left text-sm font-medium transition-colors " +
                      (data.colorTheme === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "hover:border-primary/40")
                    }
                  >
                    {themeLabels[t]}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Appearance Controls</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Radius</Label>
                  <select value={data.radius || "soft"} onChange={(e) => setValue("radius", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                    <option value="soft">Soft</option>
                    <option value="rounded">Rounded</option>
                    <option value="sharp">Sharp</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Card style</Label>
                  <select value={data.cardStyle || "premium"} onChange={(e) => setValue("cardStyle", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                    <option value="premium">Premium</option>
                    <option value="glass">Glass</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Typography scale</Label>
                  <select value={data.typographyScale || "balanced"} onChange={(e) => setValue("typographyScale", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                    <option value="compact">Compact</option>
                    <option value="balanced">Balanced</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Section spacing</Label>
                  <select value={data.sectionSpacing || "normal"} onChange={(e) => setValue("sectionSpacing", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        )}
      </SingleForm>
    </div>
  );
}
