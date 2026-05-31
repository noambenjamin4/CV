"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 to its target when scrolled into view.
 * Parses a display string like "$50K+", "1,500+", "~47%" into
 * prefix + number + suffix and only animates the number.
 *
 * Triggering uses a lightweight scroll/resize viewport check (reliable
 * everywhere), and a hard fallback timer guarantees the final value
 * always shows even if animation frames are throttled.
 */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!match) return;
    const node = ref.current;
    if (!node) return;

    let started = false;
    let raf = 0;
    let endTimer: ReturnType<typeof setTimeout> | undefined;
    let hardFallback: ReturnType<typeof setTimeout> | undefined;
    const duration = 1300;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (hardFallback) clearTimeout(hardFallback);
    };

    const run = () => {
      if (started) return;
      started = true;
      cleanup();
      if (reduce) {
        setDisplay(target);
        return;
      }
      let start: number | null = null;
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setDisplay(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      // Guarantee the final value regardless of frame throttling.
      endTimer = setTimeout(() => setDisplay(target), duration + 250);
    };

    function check() {
      const r = node!.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.88 && r.bottom > 0) run();
    }

    // Absolute guarantee: never leave the number stuck at 0.
    hardFallback = setTimeout(() => setDisplay(target), 4000);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check(); // already in view on load?

    return () => {
      cleanup();
      cancelAnimationFrame(raf);
      if (endTimer) clearTimeout(endTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <>{value}</>;

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
