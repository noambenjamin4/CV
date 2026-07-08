import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CvDownload from "@/components/CvDownload";
import CountUp from "@/components/CountUp";
import MusicPlayer from "@/components/MusicPlayer";
import HeroReel from "@/components/HeroReel";
import { profile, siteUrl, education as eduData, skills as skillsData } from "@/lib/data";
import { dirOf, type SiteContent } from "@/lib/content";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Montréal", addressRegion: "QC", addressCountry: "CA" },
  sameAs: [profile.linkedin, profile.instagram],
  alumniOf: eduData.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
  worksFor: { "@type": "Organization", name: "Afterlife Events" },
  knowsAbout: skillsData,
  knowsLanguage: ["English", "French"],
};

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <Reveal className="section-head">
      <div className="section-meta">
        <span className="section-index">{index}</span>
        <span className="section-eyebrow">{label}</span>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <h2 className="section-title">{title}</h2>
    </Reveal>
  );
}

export default function SiteHome({ t }: { t: SiteContent }) {
  const homeHref = t.lang === "fr" ? "/fr" : "/";
  const contactHref = t.lang === "fr" ? "/fr/contact" : "/contact";

  return (
    <div lang={t.lang} dir={dirOf(t.lang)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Nav lang={t.lang} labels={t.nav} />

      {/* Hero */}
      <header className="hero">
        <div className="container">
          <HeroReel />
          <div className="hero-index">
            <span className="hero-status">
              <span className="availability-dot" aria-hidden="true" />
              {t.hero.availability}
            </span>
            <span>{t.hero.cvLine}</span>
          </div>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{t.hero.title}</p>
          <p className="hero-meta">
            {t.hero.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
          <p className="hero-summary">{t.hero.summary}</p>
          <div className="hero-actions">
            <Link href={contactHref} className="btn btn-primary">
              {t.hero.getInTouch}
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Link>
            <CvDownload className="btn btn-secondary" label={t.hero.downloadCv} />
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container">
        <div className="stats">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} direction="scale" delay={i * 90}>
              <div className="stat">
                <div className="stat-value">
                  <CountUp value={s.value} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="stats-note">{t.statsNote}</p>
        </Reveal>
      </div>

      {/* About + featured case study */}
      <section id="about">
        <div className="container">
          <SectionHead index="01" label={t.about.label} title={t.about.title} />
          <div className="about-grid">
            <Reveal direction="left" className="about-lead">
              {t.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
            <Reveal direction="right">
              <div className="case-study">
                <div className="case-study-head">
                  <span className="case-study-tag">{t.caseStudy.tag}</span>
                  <h3 className="case-study-title">{t.caseStudy.title}</h3>
                </div>
                <dl className="case-study-list">
                  {t.caseStudy.rows.map((r) => (
                    <div className="case-row" key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="container">
          <SectionHead index="02" label={t.experience.label} title={t.experience.title} />
          <div className="exp-list">
            {t.experience.items.map((job, i) => (
              <Reveal key={`${job.role}-${job.org}`} direction={i % 2 === 0 ? "left" : "right"}>
                <article className="exp-card">
                  <div className="exp-head">
                    <h3 className="exp-role">
                      {job.role} <span className="exp-org">· {job.org}</span>
                    </h3>
                    <span className="exp-period">{job.period}</span>
                  </div>
                  <ul className="exp-points">
                    {job.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="container">
          <SectionHead index="03" label={t.projects.label} title={t.projects.title} />
          <div className="project-grid">
            {t.projects.items.map((proj, i) => (
              <Reveal key={proj.title} direction="scale" delay={i * 110}>
                <article className="project-card">
                  <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="project-tag">{proj.tag}</span>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>
                  {proj.link && (
                    <a className="project-link" href={proj.link} target="_blank" rel="noopener noreferrer">
                      {proj.linkLabel ?? "Visit"} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music">
        <div className="container">
          <SectionHead index="04" label={t.music.label} title={t.music.title} />
          <Reveal className="music-intro">
            <p>{t.music.intro}</p>
          </Reveal>
          <Reveal delay={80}>
            <MusicPlayer playLabel={t.music.playLabel} />
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section id="skills">
        <div className="container">
          <SectionHead index="05" label={t.capabilities.label} title={t.capabilities.title} />
          <div className="two-col">
            <Reveal direction="left">
              <div>
                <div className="col-block">
                  <p className="col-label">{t.capabilities.coreLabel}</p>
                  <div className="chip-row">
                    {t.capabilities.core.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="col-block">
                  <p className="col-label">{t.capabilities.qualitiesLabel}</p>
                  <div className="chip-row">
                    {t.capabilities.qualities.map((q) => (
                      <span className="chip" key={q}>{q}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <div className="col-block">
                  <p className="col-label">{t.capabilities.languagesLabel}</p>
                  {t.capabilities.languages.map((l) => (
                    <div className="lang-row" key={l.name}>
                      <span className="lang-name">{l.name}</span>
                      <span className="lang-level">{l.level}</span>
                    </div>
                  ))}
                </div>
                <div className="col-block">
                  <p className="col-label">{t.capabilities.toolsLabel}</p>
                  <div className="chip-row">
                    {t.capabilities.tools.map((tool) => (
                      <span className="chip" key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education">
        <div className="container">
          <SectionHead index="06" label={t.education.label} title={t.education.title} />
          <div className="edu-list">
            {t.education.items.map((e, i) => (
              <Reveal key={e.school} direction="up" delay={i * 100}>
                <div className="edu-row">
                  <div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-cred">{e.credential}</div>
                  </div>
                  <span className="edu-detail">{e.detail}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <SectionHead index="07" label={t.cta.label} title={t.cta.title} />
          <Reveal>
            <p className="hero-summary" style={{ marginTop: 0, marginBottom: 32 }}>
              {t.cta.text}
            </p>
            <div className="hero-actions" style={{ marginTop: 0 }}>
              <Link href={contactHref} className="btn btn-primary">
                {t.cta.button}
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer lang={t.lang} footer={t.footer} downloadLabel={t.nav.download} homeHref={homeHref} />
    </div>
  );
}
