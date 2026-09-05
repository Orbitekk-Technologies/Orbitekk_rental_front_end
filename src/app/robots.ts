import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/managers/",
        "/tenants/",
        "/oauth/",
        "/signin",
        "/signup",
        "/forgot-password",
      ],
    },
    sitemap: "https://www.shagriha.com/sitemap.xml",
    host: "https://www.shagriha.com",
  };
}
