import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Daily keep-alive ping (called by Vercel Cron — see vercel.json).
 * Free-tier Supabase projects pause after ~1 week without API activity,
 * which silently breaks contact-form storage. One lightweight query a day
 * keeps the project active so messages are always stored.
 */
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: "supabase not configured" }, { status: 200 });
  }

  const { error } = await supabase
    .from("contact_messages")
    .select("id", { head: true, count: "exact" })
    .limit(1);

  if (error) {
    console.error("[keepalive] ping failed:", error.message);
    return NextResponse.json({ ok: false, reason: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
