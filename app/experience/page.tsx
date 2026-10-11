import type { Metadata } from "next";
import SplitText from "../components/SplitText";
import Timeline from "../components/Timeline";
import AnimatedCounter from "../components/AnimatedCounter";
import StaggerGrid, { StaggerItem } from "../components/StaggerGrid";
import { experiences } from "@/data/experience";
import { stats } from "@/data/stats";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "From open-source projects and production platforms to founding AI-powered products — the journey so far.",
};

export default function ExperiencePage() {
  const metrics = [
    { value: stats.projects, suffix: "+", label: "Projects Shipped" },
    { value: stats.totalSkills, suffix: "+", label: "Technologies" },
    { value: stats.mobileApps, suffix: "", label: "Mobile Apps" },
    { value: stats.liveProducts, suffix: "", label: "Live Products" },
  ];

  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="section-sm">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div
              className="hero-reveal flex items-center gap-3 mb-8"
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <div
                className="w-10 h-px"
                style={{ background: "var(--brand)" }}
              />
              <span
                className="brand-mono text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Career
              </span>
            </div>
            <SplitText
              as="h1"
              text="Experience"
              className="heading-display text-hero mb-8 tracking-tight"
            />
            <p
              className="hero-reveal text-body text-lead max-w-2xl leading-relaxed"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              From building open-source projects and shipping production
              platforms to founding AI-powered products. Here&apos;s the journey
              so far.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <Timeline items={experiences} />
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section
        className="section-sm"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((stat) => (
              <StaggerItem key={stat.label}>
                <div
                  data-spotlight
                  className="card-lift text-center p-6 rounded-xl"
                  style={{
                    background: "var(--surface-1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="heading-display text-4xl md:text-5xl mb-3 tracking-tighter"
                    duration={1.8}
                  />
                  <p
                    className="brand-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </div>
  );
}
