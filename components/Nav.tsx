"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

export default function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") {
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
  }, [pathname]);

  // Lock background scroll while the mobile menu is open.
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
          <Link href="/" className="nav-brand" onClick={close}>
            {profile.name}
          </Link>

          <div className="nav-links">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`/#${s.id}`}
                className={`nav-hide ${active === s.id ? "active" : ""}`}
              >
                {s.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/contact" className="nav-cta">
              Contact
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

      <div
        className={`nav-overlay ${open ? "open" : ""}`}
        onClick={close}
        aria-hidden={!open}
      >
        <div className="nav-overlay-links">
          {sections.map((s) => (
            <Link key={s.id} href={`/#${s.id}`} onClick={close}>
              {s.label}
            </Link>
          ))}
          <Link href="/contact" onClick={close}>
            Contact
          </Link>
          <a href={profile.cv} download onClick={close}>
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}
