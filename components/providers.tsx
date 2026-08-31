"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
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
        <LanguageProvider defaultLanguage={defaultLanguage}>{children}</LanguageProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
