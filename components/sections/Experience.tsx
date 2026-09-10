"use client";

import { m } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Experience } from "@/types/content";

export function ExperienceSection({ items }: { items: Experience[] }) {
  const { language, t } = useLanguage();

  return (
    <section id="experience" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            {t("Experience", "الخبرات")}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("Professional Experience", "الخبرة المهنية")}
          </h2>

          <div className="relative mt-8 space-y-6 border-l pl-6">
            {items.map((exp) => (
              <div key={exp._id || exp.titleEn} className="relative">
                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                  <Briefcase className="h-3 w-3 text-primary" />
                </span>
                <div className="glass-card rounded-lg border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold">
                        {language === "ar" ? exp.titleAr || exp.titleEn : exp.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "ar" ? exp.companyAr || exp.companyEn : exp.companyEn}
                      </p>
                    </div>
                    <span className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                      {language === "ar" ? exp.durationAr || exp.durationEn : exp.durationEn}
                    </span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-foreground/85">
                    {(language === "ar" ? exp.bulletsAr : exp.bulletsEn)
                      .filter(Boolean)
                      .map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                  </ul>
                  {Array.isArray(exp.tools) && exp.tools.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
