import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";
import SplitText from "../components/SplitText";
import RevealText from "../components/RevealText";
import StackCards from "../components/StackCards";
import NowWidget from "../components/NowWidget";
import GitHubStats from "../components/GitHubStatsLazy";
import AnimatedCounter from "../components/AnimatedCounter";
import StaggerGrid, { StaggerItem } from "../components/StaggerGrid";
import { skillCategories, exploring, techStack } from "@/data/skills";
import { stats, now } from "@/data/stats";
import { socialLinks } from "@/data/navigation";
import {
  LayoutIcon,
  ServerIcon,
  SmartphoneIcon,
  DatabaseIcon,
  CpuIcon,
  TerminalSquareIcon,
  CodeIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack engineer building across Rust, Go, React and React Native. Skills, philosophy and what I'm exploring now.",
};

// Heavy / interactive widgets load after the page is interactive
const TagSphere = dynamic(() => import("../components/TagSphere"));

function CategoryIcon({ name }: { name: string }) {
  const props = { size: 18 };
  switch (name) {
    case "layout":
      return <LayoutIcon {...props} />;
    case "server":
      return <ServerIcon {...props} />;
    case "smartphone":
      return <SmartphoneIcon {...props} />;
    case "database":
      return <DatabaseIcon {...props} />;
    case "cpu":
      return <CpuIcon {...props} />;
    case "terminal":
      return <TerminalSquareIcon {...props} />;
    default:
      return <CodeIcon {...props} />;
  }
}

const principles = [
  {
    icon: <ServerIcon size={22} />,
    title: "Ship Fast, Iterate Faster",
    description:
      "I believe in getting to users quickly. Perfect is the enemy of shipped. Build the smallest thing that validates the assumption, then improve ruthlessly based on real feedback.",
  },
  {
    icon: <CpuIcon size={22} />,
    title: "Systems Thinking First",
    description:
      "Every feature is part of a larger system. I think about data flow, failure modes, and scaling characteristics before writing the first line of code. Architecture decisions compound.",
  },
  {
    icon: <PenToolIcon size={22} />,
    title: "Craft Matters",
    description:
      "Performance, design quality, and developer experience aren't nice-to-haves — they're competitive advantages. Users can feel the difference between thoughtful and thoughtless software.",
  },
];

export default function AboutPage() {
  const github = socialLinks.find((s) => s.icon === "github");

  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="section relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 20%, var(--mesh-2), transparent 70%)",
          }}
        />
        <div className="container-wide relative">
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
                About
              </span>
            </div>
            <SplitText
              as="h1"
              text="I build software that ships and scales."
              highlight={["ships", "scales."]}
              className="heading-display text-h1 mb-12 tracking-tight"
            />
            <div className="space-y-8 max-w-3xl">
              <RevealText
                className="text-body text-lead leading-relaxed"
                text="I'm a full-stack engineer who builds across the entire stack — from Rust-powered desktop apps and Go backend services to React frontends and React Native mobile apps. I believe in shipping real products, not just prototypes."
              />
              <RevealText
                className="text-body text-lead leading-relaxed"
                text={`With ${stats.projects}+ open-source projects spanning web, mobile, systems programming, and AI, I focus on building software that solves real problems with clean architecture and production-grade quality.`}
              />
              <RevealText
                className="text-body text-lead leading-relaxed"
                text={`Currently building ${now.building} — ${now.buildingDescription} — and SkillFest, a production event management platform deployed on Cloudflare.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SNAPSHOT — bento ═══ */}
      <section
        className="section-sm"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-4">
            <StaggerItem className="col-span-2 row-span-2">
              <NowWidget className="h-full" />
            </StaggerItem>
            <StaggerItem>
              <Stat
                value={stats.projects}
                suffix="+"
                label="Open-source projects"
              />
            </StaggerItem>
            <StaggerItem>
              <Stat value={stats.totalSkills} label="Skills, 6 domains" />
            </StaggerItem>
            <StaggerItem>
              <Stat value={stats.liveProducts} label="Live deployments" />
            </StaggerItem>
            <StaggerItem>
              <a
                href={github?.href}
                target="_blank"
                rel="noopener noreferrer"
                data-spotlight
                className="card-lift flex flex-col justify-between h-full p-5 rounded-2xl group"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                }}
              >
                <GitHubIcon size={22} />
                <span className="flex items-center justify-between">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    @CodeMaverick-143
                  </span>
                  <ArrowUpRightIcon
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </StaggerItem>
            <StaggerItem className="col-span-2 md:col-span-4">
              <div
                data-spotlight
                className="flex flex-wrap items-center gap-x-8 gap-y-3 p-5 rounded-2xl"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="brand-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Location
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {now.location}
                </span>
                <span
                  className="hidden md:block w-px h-4"
                  style={{ background: "var(--border)" }}
                />
                <span
                  className="brand-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Focus
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Systems · AI · Developer tools
                </span>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* ═══ HOW I BUILD — stacking cards ═══ */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <SectionHeading
            label="Philosophy"
            title="How I Build"
            description="Principles that guide my engineering and product decisions."
          />
          <StackCards items={principles} />
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section
        className="section cv-auto"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center mb-8">
            <SectionHeading
              label="Capabilities"
              title="Technical Skills"
              description={`${stats.totalSkills} skills across ${skillCategories.length} domains — each one earned through real projects, not tutorials. Hover a card to flip it.`}
            />
            <div className="hidden lg:flex justify-center">
              <TagSphere tags={techStack} radius={140} />
            </div>
          </div>

          <GitHubStats />

          <div className="space-y-16">
            {skillCategories.map((category) => (
              <ScrollReveal key={category.name}>
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "var(--brand-soft)",
                      border: "1px solid var(--brand-border)",
                      color: "var(--brand)",
                    }}
                  >
                    <CategoryIcon name={category.iconName} />
                  </span>
                  <div>
                    <h3
                      className="text-sm font-bold uppercase tracking-[0.1em]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {category.name}
                    </h3>
                    <span
                      className="brand-mono text-[10px] font-bold uppercase tracking-wider mt-1 block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {category.skills.length} technical skill
                      {category.skills.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.skills.map((skill, si) => (
                    <SkillCard key={skill.name} skill={skill} index={si} />
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPLORING ═══ */}
      <section
        className="section cv-auto"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-tight">
          <SectionHeading
            label="Currently"
            title="What I'm Exploring"
            description="Areas I'm actively learning and building in."
          />
          <StaggerGrid className="space-y-4" stagger={0.07}>
            {exploring.map((item, i) => (
              <StaggerItem key={i}>
                <div
                  data-spotlight
                  className="reveal-css flex items-center gap-4 p-5 rounded-xl transition-transform duration-300 hover:translate-x-2"
                  style={{
                    background: "var(--surface-1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="font-code text-xs flex-shrink-0 w-8 text-center"
                    style={{ color: "var(--brand)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item}
                  </span>
                  <span
                    className="ml-auto flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ArrowUpRightIcon size={14} />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </div>
  );
}

function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div
      data-spotlight
      className="card-lift flex flex-col justify-between h-full p-5 rounded-2xl"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      <AnimatedCounter
        value={value}
        suffix={suffix}
        className="heading-display text-4xl"
        duration={1.6}
      />
      <span
        className="brand-mono text-[9px] uppercase tracking-[0.2em] mt-3"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function PenToolIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
