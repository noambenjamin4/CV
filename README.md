# Noam Benjamin — CV / Portfolio

A clean, Apple-style personal CV site built with **Next.js** (App Router) and a
**Supabase** backend. The contact page sends messages straight to your inbox.

## Stack

- **Foundation:** Next.js 15 (App Router, TypeScript)
- **Backend:** Supabase (stores every contact submission)
- **Email:** Resend (delivers the message to your inbox)
- **Styling:** hand-written CSS, automatic light/dark mode that follows the
  visitor's system theme

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The site works immediately. In development, the contact form succeeds and logs
the message to your terminal even before you connect a backend.

## Make the contact form email you (production)

1. Copy the env template:
   ```bash
   cp .env.local.example .env.local
   ```
2. **Supabase** — create a project, then run `supabase/schema.sql` in the SQL
   Editor. Paste your project URL and **service_role** key into `.env.local`.
3. **Resend** — create a free API key at https://resend.com/api-keys and paste
   it into `.env.local`. Messages are delivered to `CONTACT_EMAIL`.
4. Restart `npm run dev` (or redeploy).

> Note: env keys must be added by you — they're tied to your own accounts.

## Structure

```
app/
  layout.tsx          # root layout + metadata + theme-color
  page.tsx            # home (full CV)
  globals.css         # all styling + light/dark theme
  contact/
    page.tsx          # /contact route
    ContactForm.tsx   # client form (loading/success/error states)
  api/contact/route.ts # stores to Supabase + emails via Resend
components/            # Nav, Footer, Reveal (scroll animation)
lib/
  data.ts             # all CV content
  supabase.ts         # server Supabase client
supabase/schema.sql   # contact_messages table
```
