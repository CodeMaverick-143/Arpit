import {
  isTechIconKey,
  resolveTechIcon,
  techIconIsDark,
  techIconSrc,
  TECH_ICONS,
  type TechIconKey,
} from "@/lib/techIcons";

interface TechIconProps {
  /** Registry key (preferred) or any free-form label to resolve */
  name: string;
  size?: number;
  className?: string;
  /** Show the original brand colours at rest instead of greyscale */
  color?: boolean;
  /** Fallback label used for the monogram when no icon exists */
  label?: string;
}

/**
 * Self-hosted technology logo. Greyscale at rest (monochrome system),
 * original colours on hover via `.tech-icon` in globals.css. Falls back
 * to a monogram tile when no icon is registered. Server-renderable.
 */
export default function TechIcon({
  name,
  size = 20,
  className = "",
  color = false,
  label,
}: TechIconProps) {
  const key: TechIconKey | null = isTechIconKey(name)
    ? name
    : resolveTechIcon(name);

  if (!key) {
    const text =
      (label ?? name)
        .replace(/[^a-z0-9]/gi, "")
        .slice(0, 2)
        .toUpperCase() || "?";
    return (
      <span
        aria-hidden
        className={`inline-flex items-center justify-center rounded-md brand-mono font-bold select-none ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: Math.max(8, size * 0.42),
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text-tertiary)",
        }}
      >
        {text}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={techIconSrc(key)}
      alt=""
      aria-hidden
      title={TECH_ICONS[key].label}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`tech-icon ${color ? "tech-icon-color" : ""} ${techIconIsDark(key) ? "tech-icon-ink" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
