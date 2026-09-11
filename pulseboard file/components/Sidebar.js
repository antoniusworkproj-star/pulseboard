"use client";

import { useEffect, useState } from "react";
import StatsBar from "./StatsBar";

export default function Sidebar({ tasks, onNewTask }) {
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
    <aside className="animate-flicker-in flex flex-col border-b border-void-line bg-void-panel/60 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 border-b border-void-line px-6 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-violet-glow/50 text-violet-glow shadow-glowViolet clip-tag">
          <span className="font-display text-lg font-bold">A</span>
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold tracking-wide text-ink">
            ANTZ<span className="text-violet-glow">//</span>DIARIUM
          </h1>
          <p className="truncate font-mono text-[11px] text-ink-dim">
            jurnal pekerjaan — sinkron google sheets
          </p>
        </div>
      </div>

      <div className="border-b border-void-line px-6 py-5 font-mono text-xs text-ink-dim">
        <div className="text-lg text-azure-glow">{timeStr}</div>
        <div>{dateStr}</div>
      </div>

      <div className="border-b border-void-line px-6 py-5 lg:flex-1 lg:overflow-y-auto">
        <p className="mb-3 font-mono text-[10px] tracking-wider text-ink-faint">
          STATUS_LOG
        </p>
        <StatsBar tasks={tasks} />
      </div>

      <div className="px-6 py-5 lg:mt-auto">
        <button
          onClick={onNewTask}
          className="w-full border border-azure-glow/60 bg-azure-glow/10 px-4 py-3 font-display text-sm font-semibold tracking-wide text-azure-glow shadow-glowAzure transition-colors hover:bg-azure-glow/20 clip-tag"
        >
          + TUGAS BARU
        </button>
      </div>
    </aside>
  );
}
