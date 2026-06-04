import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactView from "@/components/ContactView";
import { isLocale, localeCodes, type Locale } from "@/lib/content";
import { profile } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeCodes.filter((c) => c !== "en").map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") return {};
  return {
    title: `Contact · ${profile.name}`,
    description: `Contact ${profile.name}.`,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        ...Object.fromEntries(localeCodes.map((c) => [c, c === "en" ? "/contact" : `/${c}/contact`])),
        "x-default": "/contact",
      },
    },
  };
}

export default async function LangContact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <ContactView lang={lang as Locale} />;
}
