import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/app/globals.css";
import { connectToDatabase } from "@/lib/mongodb";
import ThemeSettings from "@/models/ThemeSettings";
import SiteSettings from "@/models/SiteSettings";
import { buildThemeStyle } from "@/lib/content/theme-settings";
import { siteUrl } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

async function getThemeData() {
  try {
    await connectToDatabase();
    const theme = await ThemeSettings.findOne().lean();
    const settings = await SiteSettings.findOne().lean();
    return {
      colorTheme: theme?.colorTheme || "purple-ai",
      radius: theme?.radius || "soft",
      cardStyle: theme?.cardStyle || "premium",
      typographyScale: theme?.typographyScale || "balanced",
      sectionSpacing: theme?.sectionSpacing || "normal",
      defaultLanguage: settings?.defaultLanguage || "en",
      favicon: settings?.favicon || ""
    };
  } catch {
    return {
      colorTheme: "purple-ai",
      radius: "soft",
      cardStyle: "premium",
      typographyScale: "balanced",
      sectionSpacing: "normal",
      defaultLanguage: "en" as const,
      favicon: ""
    };
  }
}

const metadataBase = new URL(siteUrl());

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase,
    title: "Abdelrahman Ahmed — ML & Data Analyst",
    description:
      "ML & Data Analyst building machine learning solutions, data pipelines, deep learning, NLP, RAG and data analysis tools.",
    keywords: ["data analyst", "AI", "machine learning", "deep learning", "NLP", "RAG", "Python", "Power BI"]
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const themeData = await getThemeData();
  const themeStyle = buildThemeStyle(themeData.colorTheme);
  const favicon = themeData.favicon || "/assets/Me.jpeg";

  return (
    <html
      lang={themeData.defaultLanguage}
      dir={themeData.defaultLanguage === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className="font-sans"
      data-color-theme={themeData.colorTheme}
      data-card-style={themeData.cardStyle}
      data-radius-style={themeData.radius}
      data-typography-scale={themeData.typographyScale}
      data-section-spacing={themeData.sectionSpacing}
      style={themeStyle}
    >
      <head>
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers defaultLanguage={themeData.defaultLanguage}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
