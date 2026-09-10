"use client";

import { useEffect, useState } from "react";

export default function Header({ onNewTask }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString("id-ID", { hour12: false })
    : "--:--:--";
  const dateStr = now
    ? now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <header className="animate-flicker-in border-b border-void-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-cyan-glow/50 text-cyan-glow shadow-glowCyan clip-tag">
            <span className="font-display text-lg font-bold">N</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-wide text-ink">
              NOCTURNE
              <span className="text-cyan-glow">//</span>WORK LOG
            </h1>
            <p className="font-mono text-xs text-ink-dim">
              jurnal pekerjaan pribadi — tersinkron ke google sheets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right font-mono text-xs text-ink-dim">
            <div className="text-cyan-glow">{timeStr}</div>
            <div>{dateStr}</div>
          </div>
          <button
            onClick={onNewTask}
            className="group relative border border-magenta-glow/60 bg-magenta-glow/10 px-4 py-2 font-display text-sm font-semibold tracking-wide text-magenta-glow shadow-glowMagenta transition-colors hover:bg-magenta-glow/20 clip-tag"
          >
            + TUGAS BARU
          </button>
        </div>
      </div>
    </header>
  );
}
