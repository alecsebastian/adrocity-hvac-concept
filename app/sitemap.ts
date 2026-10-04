import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  return ["/", "/repairs/", "/new-systems/", "/crew/", "/field-notes/", ...articles.map(a => `/field-notes/${a.slug}/`)].map(path => ({ url: new URL(path, origin).href }));
}
