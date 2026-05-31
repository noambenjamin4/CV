-- Run this in the Supabase dashboard → SQL Editor.
-- Creates the table that stores contact-form submissions.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Keep the table private. The server uses the service_role key,
-- which bypasses RLS, so no public policies are needed.
alter table public.contact_messages enable row level security;
