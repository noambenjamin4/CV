import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact · ${profile.name}`,
  description: `Get in touch with ${profile.name}.`,
  alternates: {
    canonical: "/contact",
    languages: { en: "/contact", fr: "/fr/contact", "x-default": "/contact" },
  },
};

export default function ContactPage() {
  return <ContactView lang="en" />;
}
