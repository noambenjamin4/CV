"use client";

import { useEffect, useRef } from "react";

/**
 * Looping turntable clip in the hero. Auto-plays and loops forever;
 * pauses while the cursor is over it and resumes on mouse-out.
 * Soft-masked edges so it melts into the dark hero background.
 */
export default function HeroReel() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pause = () => el.pause();
    const resume = () => {
      void el.play();
    };
    // Some browsers ignore the autoplay attribute until an explicit play();
    // muted + playsInline makes this allowed.
    void el.play();
    el.addEventListener("canplay", resume);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => {
      el.removeEventListener("canplay", resume);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="hero-reel"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      {/* Transparent-background cutout (VP9 alpha) for Chrome/Firefox/Edge; */}
      {/* the mp4 is an opaque fallback for browsers without VP9 alpha. */}
      <source src="/suit-noam.webm" type="video/webm" />
      <source src="/suit-noam.mp4" type="video/mp4" />
    </video>
  );
}
