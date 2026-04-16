import { MetadataRoute } from "next";
import { siteConfig } from "@/data/navigation";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
