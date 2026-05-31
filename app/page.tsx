import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CvDownload from "@/components/CvDownload";
import CountUp from "@/components/CountUp";
import {
  profile,
  siteUrl,
  stats,
  statsNote,
  experience,
  projects,
  skills,
  qualities,
  tools,
  languages,
  education,
} from "@/lib/data";

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
  alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
  worksFor: { "@type": "Organization", name: "Afterlife Events" },
  knowsAbout: skills,
  knowsLanguage: ["English", "French"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Nav />

      {/* Hero */}
      <header className="hero">
        <div className="container">
          <span className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {profile.availability}
          </span>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-meta">
            <span>{profile.location}</span>
            {profile.currently.map((c) => (
              <span key={c.org}>
                {c.role} · {c.org}
              </span>
            ))}
          </p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Link>
            <CvDownload className="btn btn-secondary" label="Download CV" />
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container">
        <div className="stats">
          {stats.map((s, i) => (
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
          <p className="stats-note">{statsNote}</p>
        </Reveal>
      </div>

      {/* Experience */}
      <section id="experience">
        <div className="container">
          <Reveal>
            <p className="section-eyebrow">Experience</p>
            <h2 className="section-title">Where I&apos;ve worked.</h2>
          </Reveal>
          <div className="exp-list">
            {experience.map((job, i) => (
              <Reveal
                key={`${job.role}-${job.org}`}
                direction={i % 2 === 0 ? "left" : "right"}
              >
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
          <Reveal>
            <p className="section-eyebrow">Projects &amp; Ventures</p>
            <h2 className="section-title">Things I&apos;ve built.</h2>
          </Reveal>
          <div className="project-grid">
            {projects.map((proj, i) => (
              <Reveal key={proj.title} direction="scale" delay={i * 110}>
                <article className="project-card">
                  <span className="project-tag">{proj.tag}</span>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>
                  {proj.link && (
                    <a
                      className="project-link"
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {proj.linkLabel ?? "Visit"}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills, qualities, languages */}
      <section id="skills">
        <div className="container">
          <Reveal>
            <p className="section-eyebrow">Skills</p>
            <h2 className="section-title">What I bring.</h2>
          </Reveal>
          <div className="two-col">
            <Reveal direction="left">
              <div>
                <div className="col-block">
                  <p className="col-label">Core skills</p>
                  <div className="chip-row">
                    {skills.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-block">
                  <p className="col-label">Qualities</p>
                  <div className="chip-row">
                    {qualities.map((q) => (
                      <span className="chip" key={q}>
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <div className="col-block">
                  <p className="col-label">Languages</p>
                  {languages.map((l) => (
                    <div className="lang-row" key={l.name}>
                      <span className="lang-name">{l.name}</span>
                      <span className="lang-level">{l.level}</span>
                    </div>
                  ))}
                </div>
                <div className="col-block">
                  <p className="col-label">Tools &amp; software</p>
                  <div className="chip-row">
                    {tools.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
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
          <Reveal>
            <p className="section-eyebrow">Education</p>
            <h2 className="section-title">Background.</h2>
          </Reveal>
          <div className="edu-list">
            {education.map((e, i) => (
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
          <Reveal direction="scale">
            <div style={{ textAlign: "center" }}>
              <p className="section-eyebrow">Get in touch</p>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                Let&apos;s talk.
              </h2>
              <p
                className="hero-summary"
                style={{ marginTop: 0, marginBottom: 32 }}
              >
                Whether it&apos;s a role, a project, or an event, I&apos;d like
                to hear about it. I usually reply within a day.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Contact me
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
