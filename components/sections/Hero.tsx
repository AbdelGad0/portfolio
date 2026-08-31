"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Download, Github, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Profile } from "@/types/content";

export function Hero({ profile }: { profile: Profile }) {
  const { t } = useLanguage();
  const d = profile || ({} as Profile);

  return (
    <section
      id="hero"
      className="themed-section relative flex min-h-[calc(100svh-3.5rem)] items-center justify-center overflow-hidden pt-14"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]"></div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          className="space-y-5"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {d.availableForWork && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="flex justify-center"
            >
              <span className="inline-flex items-center rounded-full border border-transparent bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-primary"></span>
                {t(d.availabilityLabelEn || "Available for work", d.availabilityLabelAr || "متاح للعمل")}
              </span>
            </motion.div>
          )}

          {d.showProfilePhoto && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="flex justify-center"
            >
              <div className="h-40 w-40 sm:h-44 sm:w-44">
                <div className="h-full w-full overflow-hidden rounded-full ring-2 ring-primary/70 ring-offset-2 ring-offset-background shadow-lg shadow-primary/25">
                  <Image
                    src={d.profileImage || "/assets/Me.jpeg"}
                    alt={d.nameEn || "Profile"}
                    width={176}
                    height={176}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: d.profilePhotoPosition || "50% 38%" }}
                    priority
                  />
                </div>
              </div>
            </motion.div>
          )}

          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            className="text-sm font-medium text-muted-foreground"
          >
            {t(d.nameEn, d.nameAr)}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t(d.headlineEn, d.headlineAr)}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            className="text-base font-medium text-foreground/90 sm:text-lg"
          >
            {t(d.titleEn, d.titleAr)}
          </motion.p>

          {d.subtitleEn && (
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base"
            >
              {t(d.subtitleEn, d.subtitleAr)}
            </motion.p>
          )}

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-2 sm:gap-3 sm:pt-3"
          >
            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/10"
            >
              <Mail className="h-4 w-4" />
              {t(d.ctaHireMeEn || "Hire Me", d.ctaHireMeAr || "وظفني")}
            </a>
            <a
              href={d.cvFile || "#"}
              download
              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-input bg-background/60 px-6 text-sm font-medium shadow-sm transition-all hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
            >
              <Download className="h-4 w-4" />
              {t(d.ctaDownloadCvEn || "Download CV", d.ctaDownloadCvAr || "تحميل السيرة")}
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-2 sm:gap-3 sm:pt-3"
          >
            {d.github && (
              <a href={d.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary">
                <Github className="h-4 w-4" />
              </a>
            )}
            {d.linkedin && (
              <a href={d.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {d.whatsapp && (
              <a href={`https://wa.me/${d.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary">
                <MessageCircle className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
