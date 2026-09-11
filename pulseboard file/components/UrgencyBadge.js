const URGENCY_MAP = {
  low: { label: "RENDAH", dot: "bg-urgency-low", text: "text-urgency-low", ring: "ring-urgency-low/40" },
  medium: { label: "SEDANG", dot: "bg-urgency-medium", text: "text-urgency-medium", ring: "ring-urgency-medium/40" },
  high: { label: "TINGGI", dot: "bg-urgency-high", text: "text-urgency-high", ring: "ring-urgency-high/40" },
  critical: { label: "KRITIS", dot: "bg-urgency-critical", text: "text-urgency-critical", ring: "ring-urgency-critical/40" },
};

export default function UrgencyBadge({ urgency = "medium" }) {
  const cfg = URGENCY_MAP[urgency] || URGENCY_MAP.medium;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-bold tracking-wide ring-1 ${cfg.ring} ${cfg.text} bg-void-raised/60 clip-tag`}
    >
      <span className={`h-1.5 w-1.5 ${cfg.dot} shadow-[0_0_6px_currentColor]`} />
      {cfg.label}
    </span>
  );
}

export { URGENCY_MAP };
