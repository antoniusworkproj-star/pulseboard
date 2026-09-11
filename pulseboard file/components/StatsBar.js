function isOverdue(task) {
  if (task.status === "done" || !task.deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.deadline) < today;
}

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const active = total - done;
  const overdue = tasks.filter(isOverdue).length;
  const critical = tasks.filter(
    (t) => t.status !== "done" && t.urgency === "critical"
  ).length;

  const stats = [
    { label: "TOTAL TUGAS", value: total, accent: "text-ink" },
    { label: "BERJALAN", value: active, accent: "text-violet-glow" },
    { label: "SELESAI", value: done, accent: "text-urgency-low" },
    { label: "TERLAMBAT", value: overdue, accent: "text-urgency-critical" },
    { label: "KRITIS", value: critical, accent: "text-urgency-high" },
  ];

  return (
    <div className="flex flex-col gap-px bg-void-line border border-void-line">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-baseline justify-between bg-void-panel px-4 py-2.5"
        >
          <span className="font-mono text-[10px] tracking-wider text-ink-faint">
            {s.label}
          </span>
          <span className={`font-display text-xl font-bold ${s.accent}`}>
            {String(s.value).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

export { isOverdue };
