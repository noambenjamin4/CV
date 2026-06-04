"use client";

import { useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/data";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ playLabel = "Play" }: { playLabel?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazily create one shared audio element.
  useEffect(() => {
    const el = new Audio();
    el.preload = "none";
    audioRef.current = el;
    const onTime = () => {
      setCurrent(el.currentTime);
      setTotal(el.duration || 0);
      setProgress(el.duration ? el.currentTime / el.duration : 0);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = (i: number) => {
    const el = audioRef.current;
    if (!el) return;
    if (active === i) {
      if (el.paused) {
        el.play();
        setPlaying(true);
      } else {
        el.pause();
        setPlaying(false);
      }
      return;
    }
    el.src = tracks[i].src;
    el.currentTime = 0;
    setActive(i);
    setProgress(0);
    setCurrent(0);
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const seek = (i: number, clientX: number, target: HTMLElement) => {
    if (active !== i) return;
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = target.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.currentTime = ratio * el.duration;
  };

  return (
    <div className="player-list">
      {tracks.map((t, i) => {
        const isActive = active === i;
        const isPlaying = isActive && playing;
        return (
          <article key={t.title} className={`player-row ${isActive ? "is-active" : ""}`}>
            <button
              type="button"
              className="player-btn"
              onClick={() => toggle(i)}
              aria-label={`${isPlaying ? "Pause" : playLabel} ${t.title}`}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6.5" y="5" width="3.6" height="14" rx="1" />
                  <rect x="13.9" y="5" width="3.6" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.2v13.6c0 .8.9 1.3 1.6.85l10.2-6.8a1 1 0 0 0 0-1.7L9.6 4.35C8.9 3.9 8 4.4 8 5.2z" />
                </svg>
              )}
            </button>

            <div className="player-main">
              <div className="player-meta">
                <span className="player-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="player-title">{t.title}</span>
                <span className="player-genre">{t.genre}</span>
                <span className="player-time">
                  {isActive && (current > 0 || playing) ? `${fmt(current)} / ${fmt(total)}` : t.duration}
                </span>
              </div>
              <div
                className="player-track"
                onClick={(e) => seek(i, e.clientX, e.currentTarget)}
                role="presentation"
              >
                <div
                  className="player-fill"
                  style={{ width: `${(isActive ? progress : 0) * 100}%` }}
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
