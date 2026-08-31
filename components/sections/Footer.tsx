"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Profile } from "@/types/content";
import { Github, Linkedin, MessageCircle } from "lucide-react";

export function Footer({
  profile,
  footerText
}: {
  profile?: Profile | null;
  footerText: { en: string; ar: string };
}) {
  const { t } = useLanguage();
  const d = profile || ({} as Profile);
  const year = new Date().getFullYear();
  const textEn = (footerText.en || "© {year} Abdelrahman Ahmed. Built with data.").replace("{year}", String(year));
  const textAr = (footerText.ar || "© {year} عبدالرحمن أحمد. مبني على البيانات.").replace("{year}", String(year));

  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">{t(textEn, textAr)}</p>
          <div className="flex items-center gap-2">
            {d.github && (
              <a href={d.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Github className="h-4 w-4" />
              </a>
            )}
            {d.linkedin && (
              <a href={d.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {d.whatsapp && (
              <a href={`https://wa.me/${d.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <MessageCircle className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
