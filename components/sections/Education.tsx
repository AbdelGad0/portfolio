"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Education } from "@/types/content";

export function EducationSection({ items }: { items: Education[] }) {
  const { language, t } = useLanguage();

  return (
    <section id="education" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            {t("Education", "التعليم")}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("Academic Background", "الخلفية الأكاديمية")}
          </h2>

          <div className="mt-8 space-y-4">
            {items.map((edu) => (
              <div key={edu._id || edu.degreeEn} className="glass-card rounded-lg border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">
                      {language === "ar" ? edu.degreeAr || edu.degreeEn : edu.degreeEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? edu.institutionAr || edu.institutionEn : edu.institutionEn}
                      {edu.fieldOfStudyEn && (
                        <span className="text-foreground/70">
                          {" — "}
                          {language === "ar" ? edu.fieldOfStudyAr || edu.fieldOfStudyEn : edu.fieldOfStudyEn}
                        </span>
                      )}
                    </p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
