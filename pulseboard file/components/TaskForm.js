"use client";

import { useState } from "react";
import { URGENCY_MAP } from "./UrgencyBadge";

const URGENCY_ORDER = ["low", "medium", "high", "critical"];

export default function TaskForm({ open, onClose, onSubmit, submitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [error, setError] = useState("");

  if (!open) return null;

  function reset() {
    setTitle("");
    setDescription("");
    setDeadline("");
    setUrgency("medium");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Judul tugas wajib diisi.");
      return;
    }
    setError("");
    try {
      await onSubmit({ title, description, deadline, urgency });
      reset();
    } catch (err) {
      setError(err.message || "Gagal menyimpan tugas.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Tutup panel"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="animate-flicker-in relative flex h-full w-full max-w-md flex-col border-l border-violet-glow/30 bg-void-panel shadow-glowViolet">
        <div className="flex items-center justify-between border-b border-void-line px-6 py-5">
          <h2 className="font-display text-xl font-bold text-ink">
            TUGAS BARU
          </h2>
          <button
            onClick={onClose}
            className="text-ink-faint hover:text-violet-glow"
            aria-label="Tutup"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current">
              <path d="m10 8.6 4.2-4.2 1.4 1.4L11.4 10l4.2 4.2-1.4 1.4L10 11.4l-4.2 4.2-1.4-1.4L8.6 10 4.4 5.8l1.4-1.4Z" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-6">
          <div>
            <label className="mb-1.5 block font-mono text-xs tracking-wide text-ink-dim">
              judul_tugas *
            </label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="mis. Kirim laporan mingguan"
              className="w-full border border-void-line bg-void-raised px-3 py-2.5 font-mono text-sm text-ink outline-none focus:border-violet-glow"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs tracking-wide text-ink-dim">
              deskripsi
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail tambahan (opsional)"
              rows={3}
              className="w-full resize-none border border-void-line bg-void-raised px-3 py-2.5 font-mono text-sm text-ink outline-none focus:border-violet-glow"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs tracking-wide text-ink-dim">
              deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-void-line bg-void-raised px-3 py-2.5 font-mono text-sm text-ink outline-none focus:border-violet-glow [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs tracking-wide text-ink-dim">
              tingkat_urgensi
            </label>
            <div className="grid grid-cols-2 gap-2">
              {URGENCY_ORDER.map((u) => {
                const cfg = URGENCY_MAP[u];
                const active = urgency === u;
                return (
                  <button
                    type="button"
                    key={u}
                    onClick={() => setUrgency(u)}
                    className={`border px-3 py-2 font-mono text-xs tracking-wide transition-colors ${
                      active
                        ? `${cfg.text} border-current bg-void-raised`
                        : "border-void-line text-ink-faint hover:text-ink-dim"
                    }`}
                  >
                    <span className={`mr-2 inline-block h-1.5 w-1.5 ${cfg.dot}`} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="font-mono text-xs text-urgency-critical">{error}</p>
          )}

          <div className="mt-auto flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-void-line py-2.5 font-display text-sm font-semibold text-ink-dim hover:text-ink"
            >
              BATAL
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 border border-violet-glow/60 bg-violet-glow/10 py-2.5 font-display text-sm font-semibold text-violet-glow shadow-glowViolet transition-colors hover:bg-violet-glow/20 disabled:opacity-50"
            >
              {submitting ? "MENYIMPAN..." : "SIMPAN TUGAS"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
