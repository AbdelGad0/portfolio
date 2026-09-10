"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig, LazyMotion, domMax } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";

export function Providers({
  children,
  defaultLanguage = "en"
}: {
  children: React.ReactNode;
  defaultLanguage?: "en" | "ar";
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
      disableTransitionOnChange
    >
<MotionConfig reducedMotion="user">
        <LazyMotion features={domMax} strict>
          <LanguageProvider defaultLanguage={defaultLanguage}>{children}</LanguageProvider>
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
