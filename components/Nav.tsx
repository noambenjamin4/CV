"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { content, type Locale } from "@/lib/content";
import ThemeToggle from "@/components/ThemeToggle";
import SiteLangSwitcher from "@/components/SiteLangSwitcher";

type NavLabels = (typeof content)["en"]["nav"];

export default function Nav({
  lang = "en",
  labels = content.en.nav,
}: {
  lang?: Locale;
  labels?: NavLabels;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const base = lang === "en" ? "" : `/${lang}`;
  const homeHref = base || "/";
  const contactHref = `${base}/contact`;

  const sections = [
    { id: "experience", label: labels.experience },
    { id: "projects", label: labels.projects },
    { id: "music", label: labels.music },
    { id: "education", label: labels.education },
  ];

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== homeHref) {
      setActive("");
      return;
    }
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, homeHref]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href={homeHref} className="nav-brand" onClick={close}>
            {profile.name}
          </Link>

          <div className="nav-links">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`${homeHref}#${s.id}`}
                className={`nav-hide ${active === s.id ? "active" : ""}`}
              >
                {s.label}
              </Link>
            ))}

            <span className="nav-hide">
              <SiteLangSwitcher current={lang} pathname={pathname} />
            </span>
            <ThemeToggle />
            <Link href={contactHref} className="nav-cta">
              {labels.contact}
            </Link>
            <button
              type="button"
              className={`nav-toggle ${open ? "open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-overlay ${open ? "open" : ""}`} onClick={close} aria-hidden={!open}>
        <div className="nav-overlay-links">
          {sections.map((s) => (
            <Link key={s.id} href={`${homeHref}#${s.id}`} onClick={close}>
              {s.label}
            </Link>
          ))}
          <Link href={contactHref} onClick={close}>
            {labels.contact}
          </Link>
          <a href={profile.cv} download onClick={close}>
            {labels.download}
          </a>
          <SiteLangSwitcher current={lang} pathname={pathname} variant="menu" />
        </div>
      </div>
    </>
  );
}
