import type { MetadataRoute } from "next";
import { LOCALES, PROFILE } from "@/lib/content/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${PROFILE.site}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${PROFILE.site}/${l}`])),
    },
  }));
}
