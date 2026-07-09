"use client";

import { useEffect, useRef } from "react";

/**
 * Looping turntable clip in the hero (desktop only). Auto-plays and loops
 * forever, continuously — never pauses. Transparent VP9-alpha cutout.
 */
export default function HeroReel() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Keep it playing: some browsers ignore the autoplay attribute until an
    // explicit play() (allowed because it is muted + playsInline).
    const resume = () => {
      void el.play();
    };
    resume();
    el.addEventListener("canplay", resume);
    return () => el.removeEventListener("canplay", resume);
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
      <source src="/suit-noam.webm" type="video/webm" />
      <source src="/suit-noam.mp4" type="video/mp4" />
    </video>
  );
}
