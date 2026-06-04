"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

type Labels = {
  email: string;
  phone: string;
  elsewhere: string;
  basedIn: string;
  copy: string;
  copied: string;
};

const DEFAULT_LABELS: Labels = {
  email: "Email",
  phone: "Phone",
  elsewhere: "Elsewhere",
  basedIn: "Based in",
  copy: "Copy",
  copied: "Copied ✓",
};

export default function ContactDetails({ labels = DEFAULT_LABELS }: { labels?: Labels }) {
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
        <span className="contact-detail-label">{labels.email}</span>
        <div className="contact-detail-value">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button type="button" className="copy-btn" onClick={copyEmail}>
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
      </div>

      <div className="contact-detail">
        <span className="contact-detail-label">{labels.phone}</span>
        <div className="contact-detail-value">
          <a href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}>{profile.phone}</a>
        </div>
      </div>

      <div className="contact-detail">
        <span className="contact-detail-label">{labels.elsewhere}</span>
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
        <span className="contact-detail-label">{labels.basedIn}</span>
        <div className="contact-detail-value">{profile.location}</div>
      </div>
    </div>
  );
}
