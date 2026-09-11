"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";

const FILTERS = [
  { id: "active", label: "BERJALAN" },
  { id: "done", label: "SELESAI" },
  { id: "all", label: "SEMUA" },
];

export default function TaskList({ tasks, onToggleDone, onDelete, busyId }) {
  const [filter, setFilter] = useState("active");

  const filtered = tasks.filter((t) => {
    if (filter === "active") return t.status !== "done";
    if (filter === "done") return t.status === "done";
    return true;
  });

  return (
    <div>
      <div className="mb-4 flex gap-1 border-b border-void-line">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 font-display text-sm font-semibold tracking-wide transition-colors ${
              filter === f.id
                ? "border-b-2 border-violet-glow text-violet-glow"
                : "text-ink-faint hover:text-ink-dim"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-void-line px-6 py-14 text-center">
          <p className="font-mono text-sm text-ink-faint">
            {filter === "done"
              ? "> belum ada tugas yang selesai."
              : "> log kosong. tambahkan tugas pertamamu."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onDelete={onDelete}
              busy={busyId === task.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
