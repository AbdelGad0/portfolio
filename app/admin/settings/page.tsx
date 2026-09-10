"use client";

import SingleForm from "@/components/admin/SingleForm";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SectionOrderEditor, type SectionDef } from "@/components/admin/SectionOrderEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_SECTIONS } from "@/lib/constants";

function toSectionDefs(sections: any[] = []): SectionDef[] {
  if (!sections || sections.length === 0) {
    return DEFAULT_SECTIONS.map((s, i) => ({
      key: s.key,
      label: s.labelEn || s.key,
      order: i + 1,
      visible: true
    }));
  }
  return [...sections]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((s) => ({
      key: s.key,
      label: s.labelEn || s.key,
      order: s.order || s.order == null ? s.order || 0 : 0,
      visible: s.visible !== false
    }));
}

function toStoredSections(defs: SectionDef[]) {
  return defs.map((d) => {
    const existing = DEFAULT_SECTIONS.find((s) => s.key === d.key);
    return {
      key: d.key,
      labelEn: existing?.labelEn || d.label,
      labelAr: existing?.labelAr || d.label,
      order: d.order,
      visible: d.visible
    };
  });
}

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6">
      <SingleForm title="Settings" apiPath="/api/settings">
        {({ data, setValue }) => {
          return (
            <div className="space-y-6">
              <section className="rounded-lg border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Site Identity & SEO</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <BilingualField label="Site title" valueEn={data.siteTitleEn} valueAr={data.siteTitleAr} onChangeEn={(v) => setValue("siteTitleEn", v)} onChangeAr={(v) => setValue("siteTitleAr", v)} />
                  <BilingualField label="Site name" valueEn={data.siteNameEn} valueAr={data.siteNameAr} onChangeEn={(v) => setValue("siteNameEn", v)} onChangeAr={(v) => setValue("siteNameAr", v)} />
<BilingualField full label="Meta description" type="textarea" rows={2} valueEn={data.defaultMetaDescriptionEn} valueAr={data.defaultMetaDescriptionAr} onChangeEn={(v) => setValue("defaultMetaDescriptionEn", v)} onChangeAr={(v) => setValue("defaultMetaDescriptionAr", v)} />
                  <div className="sm:col-span-2">
                    <ImageUpload label="Favicon / site logo (browser tab icon)" value={data.favicon || ""} onChange={(v) => setValue("favicon", v)} accept="image/*" />
                  </div>
                </div>
              </section>

              <section className="rounded-lg border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Defaults</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label>Default theme</Label>
                    <select value={data.defaultTheme || "dark"} onChange={(e) => setValue("defaultTheme", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Default language</Label>
                    <select value={data.defaultLanguage || "en"} onChange={(e) => setValue("defaultLanguage", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Projects display mode</Label>
                    <select value={data.projectsDisplayMode || "grouped"} onChange={(e) => setValue("projectsDisplayMode", e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground">
                      <option value="grouped">Grouped by category</option>
                      <option value="selected">Selected / highlighted</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Section Order & Visibility</h2>
                <SectionOrderEditor
                  sections={toSectionDefs(data.sections)}
                  onChange={(defs) => {
                    setValue("sections", toStoredSections(defs));
                  }}
                />
              </section>

              <section className="rounded-lg border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Footer</h2>
                <BilingualField full label="Footer text" type="textarea" rows={2} valueEn={data.footerTextEn} valueAr={data.footerTextAr} onChangeEn={(v) => setValue("footerTextEn", v)} onChangeAr={(v) => setValue("footerTextAr", v)} />
              </section>

              <section className="rounded-lg border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Maintenance</h2>
                <div className="flex items-center gap-2">
                  <input id="maint" type="checkbox" checked={!!data.maintenanceMode} onChange={(e) => setValue("maintenanceMode", e.target.checked)} className="h-4 w-4" />
                  <Label htmlFor="maint">Enable maintenance mode (hide public site)</Label>
                </div>
              </section>
            </div>
          );
        }}
      </SingleForm>
    </div>
  );
}
