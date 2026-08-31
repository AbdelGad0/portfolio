"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar({ sections }: { sections: { key: string; labelEn: string; labelAr: string }[] }) {
  const { language, toggleLanguage, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-background/80 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="text-base font-semibold tracking-[0.18em] text-foreground">
            AA
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {sections.map((section) => (
              <a
                key={section.key}
                href={`#${section.key}`}
                className="rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground"
              >
                {t(section.labelEn, section.labelAr)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5" />
              {language === "en" ? "عربي" : "English"}
            </button>
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Toggle theme"
            >
              {!mounted ? null : resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t bg-background/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {sections.map((section) => (
              <a
                key={section.key}
                href={`#${section.key}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {t(section.labelEn, section.labelAr)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
