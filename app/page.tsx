import type { Metadata } from "next";
import SiteHome from "@/components/SiteHome";
import { content, localeCodes } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      ...Object.fromEntries(localeCodes.map((c) => [c, c === "en" ? "/" : `/${c}`])),
      "x-default": "/",
    },
  },
};

export default function Home() {
  return <SiteHome t={content.en} />;
}
