"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { locales, localePath, isLocale, type Locale } from "@/lib/content";

export default function SiteLangSwitcher({
  current,
  pathname,
  variant = "bar",
}: {
  current: Locale;
  pathname: string;
  variant?: "bar" | "menu";
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Strip any locale prefix to get the page sub-path, then rebuild per locale.
  const seg = pathname.split("/")[1] ?? "";
  const hasLocale = isLocale(seg) && seg !== "en";
  const rawSub = (hasLocale ? pathname.slice(seg.length + 1) : pathname) || "/";
  const sub = rawSub === "/" ? "" : rawSub;

  const currentNative = locales.find((l) => l.code === current)?.native ?? "EN";

  const modal = open && (
    <div className="cv-modal-backdrop" onClick={() => setOpen(false)} role="presentation">
      <div
        className="cv-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Choose a language"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cv-modal-close" onClick={() => setOpen(false)} aria-label="Close">
          ✕
        </button>
        <div className="cv-modal-head">
          <h3>Language</h3>
          <p>Choose a language</p>
        </div>
        <div className="cv-lang-grid">
          {locales.map((l) => (
            <Link
              key={l.code}
              className={`cv-lang ${l.code === current ? "is-current" : ""}`}
              href={localePath(l.code, sub)}
              onClick={() => setOpen(false)}
              lang={l.code}
              dir={l.dir}
            >
              <span className="cv-lang-native">{l.native}</span>
              <span className="cv-lang-en">{l.en}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={variant === "menu" ? "lang-trigger lang-trigger-menu" : "lang-trigger"}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Change language"
      >
        <span aria-hidden="true" className="lang-globe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
          </svg>
        </span>
        {currentNative}
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
