import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHome from "@/components/SiteHome";
import { content, isLocale, localeCodes, type Locale } from "@/lib/content";
import { profile } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeCodes.filter((c) => c !== "en").map((lang) => ({ lang }));
}

function hreflang() {
  const langs = Object.fromEntries(localeCodes.map((c) => [c, c === "en" ? "/" : `/${c}`]));
  return { ...langs, "x-default": "/" };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") return {};
  const t = content[lang];
  const fullTitle = `${profile.name} · ${t.hero.title}`;
  return {
    title: fullTitle,
    description: t.hero.summary,
    alternates: { canonical: `/${lang}`, languages: hreflang() },
    openGraph: {
      title: fullTitle,
      description: t.hero.summary,
      url: `/${lang}`,
      siteName: profile.name,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: fullTitle }],
    },
  };
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <SiteHome t={content[lang as Locale]} />;
}
