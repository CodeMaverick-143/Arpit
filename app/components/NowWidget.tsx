import { now } from "@/data/stats";

/** "Currently building" live-status card — server component. */
export default function NowWidget({ className = "" }: { className?: string }) {
  return (
    <div
      data-spotlight
      className={`relative p-6 rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: "var(--brand)" }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "var(--brand)" }}
          />
        </span>
        <span
          className="brand-mono text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Now
        </span>
      </div>
      <p
        className="text-lg font-bold tracking-tight mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Building {now.building}
      </p>
      <p className="text-sm text-body mb-4">{now.buildingDescription}</p>
      <dl className="grid grid-cols-2 gap-3 text-[12px]">
        <div>
          <dt
            className="brand-mono text-[9px] uppercase tracking-wider mb-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Learning
          </dt>
          <dd style={{ color: "var(--text-secondary)" }}>{now.learning}</dd>
        </div>
        <div>
          <dt
            className="brand-mono text-[9px] uppercase tracking-wider mb-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Status
          </dt>
          <dd style={{ color: "var(--text-secondary)" }}>{now.status}</dd>
        </div>
      </dl>
    </div>
  );
}
