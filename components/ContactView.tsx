import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/app/contact/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import { content, dirOf, type Locale } from "@/lib/content";

export default function ContactView({ lang }: { lang: Locale }) {
  const t = content[lang];
  const c = t.contact;
  const homeHref = lang === "en" ? "/" : `/${lang}`;

  return (
    <div lang={lang} dir={dirOf(lang)}>
      <Nav lang={lang} labels={t.nav} />
      <div className="contact-wrap">
        <div className="contact-card">
          <Link href={homeHref} className="back-link">
            {c.back}
          </Link>
          <div className="contact-head">
            <h1>{c.h1}</h1>
            <p>{c.intro}</p>
          </div>
          <ContactForm t={c} />
          <div className="contact-or">{c.orDirect}</div>
          <ContactDetails labels={c.detail} />
        </div>
      </div>
      <Footer lang={lang} footer={t.footer} downloadLabel={t.nav.download} />
    </div>
  );
}
