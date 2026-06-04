import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";
import { localeCodes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = localeCodes.map((c) => ({
    url: `${siteUrl}${c === "en" ? "/" : `/${c}`}`,
    changeFrequency: "monthly" as const,
    priority: c === "en" ? 1 : 0.8,
  }));
  const contact = localeCodes.map((c) => ({
    url: `${siteUrl}${c === "en" ? "/contact" : `/${c}/contact`}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...home, ...contact];
}
