import { profile } from "@/lib/data";
import CvDownload from "@/components/CvDownload";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-about">
          <span className="footer-copy">
            © 2026 {profile.name}. All rights reserved.
          </span>
          <span className="footer-sub">
            {profile.availability} · {profile.location} · Updated{" "}
            {profile.lastUpdated}
          </span>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <CvDownload className="footer-cv-btn" label="Download CV" />
        </div>
      </div>
    </footer>
  );
}
