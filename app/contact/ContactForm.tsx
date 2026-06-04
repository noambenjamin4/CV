"use client";

import { useState } from "react";
import { content } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";
type ContactStrings = (typeof content)["en"]["contact"];

export default function ContactForm({ t = content.en.contact }: { t?: ContactStrings }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message, company }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFeedback(t.success);
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedback(data.error || t.genericError);
      }
    } catch {
      setStatus("error");
      setFeedback(t.networkError);
    }
  }

  if (status === "success") {
    return (
      <div className="form">
        <div className="alert alert-success">{feedback}</div>
        <button
          type="button"
          className="btn btn-secondary form-submit"
          onClick={() => setStatus("idle")}
        >
          {t.another}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {status === "error" && <div className="alert alert-error">{feedback}</div>}

      {/* Honeypot: hidden from real users, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      <div className="field">
        <label htmlFor="email">{t.emailLabel}</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t.emailPh}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="subject">{t.subjectLabel}</label>
        <input
          id="subject"
          type="text"
          placeholder={t.subjectPh}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="message">{t.messageLabel}</label>
        <textarea
          id="message"
          placeholder={t.messagePh}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary form-submit" disabled={status === "loading"}>
        {status === "loading" ? t.sending : t.send}
      </button>
      <p className="form-note">{t.note}</p>
    </form>
  );
}
