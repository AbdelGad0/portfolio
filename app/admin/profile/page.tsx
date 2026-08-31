"use client";

import SingleForm from "@/components/admin/SingleForm";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileAdminPage() {
  return (
    <div className="space-y-6">
      <SingleForm title="Profile" apiPath="/api/profile">
        {({ data, setValue }) => (
          <div className="space-y-6">
            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Identity</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <BilingualField label="Name" valueEn={data.nameEn} valueAr={data.nameAr} onChangeEn={(v) => setValue("nameEn", v)} onChangeAr={(v) => setValue("nameAr", v)} />
                <BilingualField label="Headline" valueEn={data.headlineEn} valueAr={data.headlineAr} onChangeEn={(v) => setValue("headlineEn", v)} onChangeAr={(v) => setValue("headlineAr", v)} />
                <BilingualField label="Title" valueEn={data.titleEn} valueAr={data.titleAr} onChangeEn={(v) => setValue("titleEn", v)} onChangeAr={(v) => setValue("titleAr", v)} />
                <BilingualField label="Subtitle" valueEn={data.subtitleEn} valueAr={data.subtitleAr} onChangeEn={(v) => setValue("subtitleEn", v)} onChangeAr={(v) => setValue("subtitleAr", v)} />
              </div>
            </section>

            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Media</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageUpload label="Profile photo" value={data.profileImage} onChange={(v) => setValue("profileImage", v)} />
                <ImageUpload label="About image" value={data.aboutImage} onChange={(v) => setValue("aboutImage", v)} />
                <ImageUpload label="CV file" value={data.cvFile} onChange={(v) => setValue("cvFile", v)} accept=".pdf,application/pdf" />
              </div>
              <div className="mt-4 space-y-1.5">
                <Label>Profile photo position (object-position)</Label>
                <Input value={data.profilePhotoPosition || "50% 38%"} onChange={(e) => setValue("profilePhotoPosition", e.target.value)} placeholder="50% 38%" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input id="showPhoto" type="checkbox" checked={!!data.showProfilePhoto} onChange={(e) => setValue("showProfilePhoto", e.target.checked)} className="h-4 w-4" />
                <Label htmlFor="showPhoto">Show profile photo</Label>
              </div>
            </section>

            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Summary & About</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <BilingualField full label="Summary" type="textarea" rows={3} valueEn={data.summaryEn} valueAr={data.summaryAr} onChangeEn={(v) => setValue("summaryEn", v)} onChangeAr={(v) => setValue("summaryAr", v)} />
                <BilingualField full label="About" type="textarea" rows={6} valueEn={data.aboutEn} valueAr={data.aboutAr} onChangeEn={(v) => setValue("aboutEn", v)} onChangeAr={(v) => setValue("aboutAr", v)} />
              </div>
            </section>

            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Contact & Social</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Email</Label><Input value={data.email} onChange={(e) => setValue("email", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Phone</Label><Input value={data.phone} onChange={(e) => setValue("phone", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>WhatsApp</Label><Input value={data.whatsapp} onChange={(e) => setValue("whatsapp", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>GitHub</Label><Input value={data.github} onChange={(e) => setValue("github", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>LinkedIn</Label><Input value={data.linkedin} onChange={(e) => setValue("linkedin", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Kaggle</Label><Input value={data.kaggle} onChange={(e) => setValue("kaggle", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Twitter / X</Label><Input value={data.twitter} onChange={(e) => setValue("twitter", e.target.value)} /></div>
                <BilingualField label="Location" valueEn={data.locationEn} valueAr={data.locationAr} onChangeEn={(v) => setValue("locationEn", v)} onChangeAr={(v) => setValue("locationAr", v)} />
              </div>
            </section>

            <section className="rounded-lg border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">CTA & Availability</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <BilingualField label="Hire me CTA" valueEn={data.ctaHireMeEn} valueAr={data.ctaHireMeAr} onChangeEn={(v) => setValue("ctaHireMeEn", v)} onChangeAr={(v) => setValue("ctaHireMeAr", v)} />
                <BilingualField label="Download CV CTA" valueEn={data.ctaDownloadCvEn} valueAr={data.ctaDownloadCvAr} onChangeEn={(v) => setValue("ctaDownloadCvEn", v)} onChangeAr={(v) => setValue("ctaDownloadCvAr", v)} />
                <BilingualField label="Availability label" valueEn={data.availabilityLabelEn} valueAr={data.availabilityLabelAr} onChangeEn={(v) => setValue("availabilityLabelEn", v)} onChangeAr={(v) => setValue("availabilityLabelAr", v)} />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input id="avail" type="checkbox" checked={!!data.availableForWork} onChange={(e) => setValue("availableForWork", e.target.checked)} className="h-4 w-4" />
                <Label htmlFor="avail">Available for work</Label>
              </div>
            </section>
          </div>
        )}
      </SingleForm>
    </div>
  );
}
