"use client";

import { m } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Profile } from "@/types/content";

export function About({ profile }: { profile: Profile }) {
  const { language, t } = useLanguage();
  const d = profile || ({} as Profile);
  const aboutText = t(d.aboutEn, d.aboutAr);
  const highlights = language === "ar" ? d.highlightsAr : d.highlightsEn;

  return (
    <section id="about" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid items-start gap-4 lg:grid-cols-[1.45fr_0.85fr] lg:gap-5"
        >
          <div className="space-y-3.5">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              {t("About", "نبذة")}
            </p>
            <div className="max-w-[62ch] space-y-3">
              {aboutText && aboutText.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="text-[15px] leading-7 text-foreground/92">
                  {para}
                </p>
              ))}
            </div>
            {Array.isArray(highlights) && highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}
