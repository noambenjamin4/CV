import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { profile } from "@/lib/data";

export const runtime = "nodejs";

type Payload = {
  email?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot — real users never fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic in-memory rate limit (per server instance): 5 requests / 10 min per IP.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: if the hidden field is filled, it's a bot. Pretend success.
  if ((body.company || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Rate limit by client IP.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a little while." },
      { status: 429 }
    );
  }

  const email = (body.email || "").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();

  // --- Validation ---
  if (!email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in your email, a subject, and a message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length > 5000 || subject.length > 200) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  // --- 1. Store the submission in Supabase (if configured) ---
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("contact_messages")
      .insert({ email, subject, message });
    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
    } else {
      stored = true;
    }
  }

  // --- 2. Send the email via Resend (if configured) ---
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `New message from your CV site\n\nFrom: ${email}\nSubject: ${subject}\n\n${message}`,
      });
      if (error) {
        console.error("[contact] Resend send failed:", error);
      } else {
        emailed = true;
      }
    } catch (err) {
      console.error("[contact] Resend threw:", err);
    }
  }

  // --- 3. Decide the response ---
  if (emailed || stored) {
    return NextResponse.json({ ok: true, stored, emailed });
  }

  // Nothing configured: succeed in dev (log it), fail loudly in production.
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[contact] (dev fallback — no backend configured)\nFrom: ${email}\nSubject: ${subject}\nMessage: ${message}`
    );
    return NextResponse.json({ ok: true, stored: false, emailed: false, dev: true });
  }

  return NextResponse.json(
    {
      error:
        "The contact backend is not configured yet. Please email me directly.",
    },
    { status: 503 }
  );
}
