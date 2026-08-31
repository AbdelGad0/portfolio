"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Medal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Certification } from "@/types/content";

export function CertificationsSection({ items }: { items: Certification[] }) {
  const { language, t } = useLanguage();

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="certifications" className="themed-section py-10 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            {t("Certifications", "الشهادات")}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("Certifications & Awards", "الشهادات والجوائز")}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((cert) => (
              <div
                key={cert._id || cert.nameEn}
                className="glass-card rounded-lg border bg-card p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Medal className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold">
                  {language === "ar" ? cert.nameAr || cert.nameEn : cert.nameEn}
                </h3>
                {cert.issuer && (
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <Award className="h-3.5 w-3.5" />
                    {t("View credential", "عرض الشهادة")}
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
