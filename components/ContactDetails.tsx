"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

export default function ContactDetails() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <div className="contact-details">
      <div className="contact-detail">
        <span className="contact-detail-label">Email</span>
        <div className="contact-detail-value">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button type="button" className="copy-btn" onClick={copyEmail}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      <div className="contact-detail">
        <span className="contact-detail-label">Phone</span>
        <div className="contact-detail-value">
          <a href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}>{profile.phone}</a>
        </div>
      </div>

      <div className="contact-detail">
        <span className="contact-detail-label">Elsewhere</span>
        <div className="contact-detail-value contact-detail-links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>

      <div className="contact-detail">
        <span className="contact-detail-label">Based in</span>
        <div className="contact-detail-value">{profile.location}</div>
      </div>
    </div>
  );
}
