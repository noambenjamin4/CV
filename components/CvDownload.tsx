"use client";

import { useEffect, useState } from "react";
import { cvLanguages, cvPath } from "@/lib/cv-languages";

export default function CvDownload({
  className = "btn btn-secondary",
  label = "Download CV",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {label}
      </button>

      {open && (
        <div className="cv-modal-backdrop" onClick={() => setOpen(false)} role="presentation">
          <div
            className="cv-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Download CV — choose a language"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cv-modal-close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
            <div className="cv-modal-head">
              <h3>Download CV</h3>
              <p>Choose a language</p>
            </div>
            <div className="cv-lang-grid">
              {cvLanguages.map((l) => (
                <a
                  key={l.code}
                  className="cv-lang"
                  href={cvPath(l.code)}
                  download={`Noam-Benjamin-CV-${l.en}.pdf`}
                  onClick={() => setOpen(false)}
                  lang={l.code}
                >
                  <span className="cv-lang-native">{l.native}</span>
                  <span className="cv-lang-en">{l.en}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
