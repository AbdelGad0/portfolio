import type { Metadata } from "next";
import { siteUrl } from "./utils";

export interface PageSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export function buildMetadata(
  settings: Record<string, any> | null,
  pageSeo?: PageSeo
): Metadata {
  const url = siteUrl();
  const detail = settings || {};

  const title = pageSeo?.title || detail.defaultMetaTitleEn || detail.siteTitleEn || "Portfolio";
  const description =
    pageSeo?.description || detail.defaultMetaDescriptionEn || detail.siteDescriptionEn || "";
  const keywords = pageSeo?.keywords || detail.siteKeywords || [];
  const ogImage = pageSeo?.ogImage || detail.ogImage || `${url}/opengraph-image`;

  return {
    metadataBase: new URL(url),
    title,
    description,
    keywords,
    openGraph: {
      title: detail.ogTitleEn || title,
      description: detail.ogDescriptionEn || description,
      url,
      siteName: detail.siteNameEn || "Portfolio",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          alt: title,
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}
