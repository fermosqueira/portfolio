import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/content/schema";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cv-es.pdf", "/cv-en.pdf"] },
    sitemap: `${PROFILE.site}/sitemap.xml`,
  };
}
