import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    }
  ];
}
