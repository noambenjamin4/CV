import { profile } from "@/lib/data";
import { content, type Locale } from "@/lib/content";
import CvDownload from "@/components/CvDownload";

export default function Footer({
  lang = "en",
  footer = content.en.footer,
  downloadLabel = content.en.nav.download,
}: {
  lang?: Locale;
  footer?: { rights: string; sub: string };
  downloadLabel?: string;
  homeHref?: string;
}) {
  return (
    <footer className="footer" lang={lang}>
      <div className="footer-inner">
        <div className="footer-about">
          <span className="footer-copy">{footer.rights}</span>
          <span className="footer-sub">{footer.sub}</span>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <CvDownload className="footer-cv-btn" label={downloadLabel} />
        </div>
      </div>
    </footer>
  );
}
