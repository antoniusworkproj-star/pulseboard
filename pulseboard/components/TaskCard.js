"use client";

import UrgencyBadge from "./UrgencyBadge";
import { isOverdue } from "./StatsBar";

const URGENCY_BORDER = {
  low: "border-l-urgency-low",
  medium: "border-l-urgency-medium",
  high: "border-l-urgency-high",
  critical: "border-l-urgency-critical",
};

function formatDeadline(deadline) {
  if (!deadline) return "TANPA TENGGAT";
  const d = new Date(deadline);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TaskCard({ task, onToggleDone, onDelete, busy }) {
  const done = task.status === "done";
  const overdue = isOverdue(task);

  return (
    <div
      className={`group relative flex items-start gap-4 border border-void-line border-l-4 bg-void-panel px-4 py-4 transition-colors hover:border-void-line hover:bg-void-raised ${
        URGENCY_BORDER[task.urgency] || URGENCY_BORDER.medium
      } ${done ? "opacity-50" : ""}`}
    >
      <button
        onClick={() => onToggleDone(task)}
        disabled={busy}
        aria-label={done ? "Tandai belum selesai" : "Tandai selesai"}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
          done
            ? "border-urgency-low bg-urgency-low/20 text-urgency-low"
            : "border-ink-faint text-transparent hover:border-cyan-glow"
        }`}
      >
        {done && (
          <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
            <path d="M6.5 11.5 3 8l1.1-1.1 2.4 2.4 5.4-5.4L13 5z" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-display text-lg font-semibold leading-tight text-ink ${
              done ? "line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          <UrgencyBadge urgency={task.urgency} />
        </div>

        {task.description && (
          <p className="mt-1 text-sm leading-relaxed text-ink-dim">
            {task.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-ink-faint">
          <span
            className={
              overdue ? "text-urgency-critical" : "text-ink-dim"
            }
          >
            deadline: {formatDeadline(task.deadline)}
            {overdue ? " (LEWAT)" : ""}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(task)}
        disabled={busy}
        aria-label="Hapus tugas"
        className="shrink-0 self-start text-ink-faint opacity-0 transition-opacity hover:text-magenta-glow group-hover:opacity-100"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M7 3h6l1 1h4v2H2V4h4l1-1Zm-2 5h10l-1 10H6L5 8Z" />
        </svg>
      </button>
    </div>
  );
}
