import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";
import { localeCodes } from "@/lib/content";

const LAST_MODIFIED = new Date("2026-07-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const home = localeCodes.map((c) => ({
    url: `${siteUrl}${c === "en" ? "/" : `/${c}`}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: c === "en" ? 1 : 0.8,
  }));
  const contact = localeCodes.map((c) => ({
    url: `${siteUrl}${c === "en" ? "/contact" : `/${c}/contact`}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...home, ...contact];
}
