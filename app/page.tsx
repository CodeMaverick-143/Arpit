import Link from "next/link";
import SplitText from "./components/SplitText";
import HeroBackground from "./components/HeroBackground";
import HeroTerminal from "./components/HeroTerminal";
import Parallax from "./components/Parallax";
import ScrollIndicator from "./components/ScrollIndicator";
import ScrollReveal from "./components/ScrollReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import SkillsCarousel from "./components/SkillsCarousel";
import MagneticButton from "./components/MagneticButton";
import HorizontalProjects from "./components/HorizontalProjects";
import SectionHeading from "./components/SectionHeading";
import StaggerGrid, { StaggerItem } from "./components/StaggerGrid";
import NowWidget from "./components/NowWidget";
import {
  ArrowRightIcon,
  LayoutIcon,
  ServerIcon,
  SmartphoneIcon,
  CpuIcon,
  GitHubIcon,
  DownloadIcon,
} from "./components/Icons";
import { projects } from "@/data/projects";
import { techStack } from "@/data/skills";
import { siteConfig } from "@/data/navigation";
import { blogPosts } from "@/data/blog";
import { stats, now } from "@/data/stats";
import { formatDate } from "@/lib/utils";

const terminalLines = [
  { type: "command" as const, text: "whoami", delay: 500 },
  {
    type: "output" as const,
    text: "Arpit Sarang — Full-stack Engineer, AI Builder, Open Source",
    delay: 400,
  },
  { type: "empty" as const, text: "", delay: 200 },
  {
    type: "command" as const,
    text: "cat skills.json | jq .primary",
    delay: 600,
  },
  {
    type: "output" as const,
    text: '["React", "Go", "Rust", "Python", "React Native","Express"]',
    delay: 400,
  },
  { type: "empty" as const, text: "", delay: 200 },
  { type: "command" as const, text: "echo $CURRENT_FOCUS", delay: 600 },
  {
    type: "output" as const,
    text: `Building ${now.building} — ${now.buildingDescription}`,
    delay: 400,
  },
  { type: "empty" as const, text: "", delay: 200 },
  { type: "command" as const, text: "ls ~/projects | wc -l", delay: 700 },
  {
    type: "output" as const,
    text: `${stats.projects} open-source repositories`,
    delay: 500,
  },
];

const areas = [
  {
    icon: <LayoutIcon size={20} />,
    label: "Frontend",
    detail: "React, Next.js, TypeScript",
  },
  {
    icon: <ServerIcon size={20} />,
    label: "Backend",
    detail: "Go, Node.js, Python",
  },
  {
    icon: <SmartphoneIcon size={20} />,
    label: "Mobile",
    detail: "React Native, Cross-Platform",
  },
  {
    icon: <CpuIcon size={20} />,
    label: "Systems",
    detail: "Rust, Tauri, Shell",
  },
];

/** Homepage — server component; only the interactive leaves are client. */
export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const latestBlogs = blogPosts.slice(0, 3);
  const metrics = [
    { value: stats.projects, suffix: "+", label: "Projects" },
    { value: stats.coreStacks, suffix: "", label: "Core stacks" },
    { value: stats.mobileApps, suffix: "", label: "Mobile apps" },
  ];

  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[calc(100vh-var(--nav-height))] flex flex-col justify-center overflow-hidden">
        <HeroBackground />

        <div className="container-wide relative z-10 py-20 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <Parallax distance={-60} fade>
              {/* Status Badge */}
              <div
                className="hero-reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 glass-subtle"
                style={{ "--d": "0ms" } as React.CSSProperties}
              >
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
                  className="font-code text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {now.status}
                </span>
              </div>

              {/* Name — visible at first paint, words slide up via CSS */}
              <SplitText
                text={siteConfig.name}
                className="heading-display text-hero mb-6 tracking-[-0.05em]"
                delay={0.1}
                staggerDelay={0.08}
                as="h1"
                highlight={["Sarang"]}
              />

              {/* Title */}
              <p
                className="hero-reveal brand-mono text-[12px] md:text-[13px] uppercase tracking-[0.2em] mb-8"
                style={
                  {
                    color: "var(--text-tertiary)",
                    "--d": "350ms",
                  } as React.CSSProperties
                }
              >
                {siteConfig.title}
              </p>

              {/* Tagline */}
              <p
                className="hero-reveal text-lead text-body max-w-xl mb-12 leading-relaxed"
                style={{ "--d": "450ms" } as React.CSSProperties}
              >
                {siteConfig.tagline}
              </p>

              {/* CTA Buttons */}
              <div
                className="hero-reveal flex flex-wrap gap-4 mb-14"
                style={{ "--d": "550ms" } as React.CSSProperties}
              >
                <MagneticButton href="/projects">
                  <span className="btn-primary gradient-border">
                    View Projects
                    <ArrowRightIcon size={14} />
                  </span>
                </MagneticButton>
                <MagneticButton href="/about">
                  <span className="btn-secondary">About Me</span>
                </MagneticButton>
                <MagneticButton href={siteConfig.resume} target="_blank">
                  <span className="btn-secondary">
                    <DownloadIcon size={14} />
                    Resume
                  </span>
                </MagneticButton>
              </div>

              {/* Metrics */}
              <div
                className="hero-reveal flex gap-12"
                style={{ "--d": "650ms" } as React.CSSProperties}
              >
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      className="heading-display text-4xl md:text-5xl"
                      duration={2}
                    />
                    <p
                      className="brand-mono text-[9px] uppercase tracking-[0.2em] mt-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </Parallax>

            {/* Right — Terminal (3D window) */}
            <div className="hidden lg:block">
              <HeroTerminal lines={terminalLines} title="~/arpitsarang — zsh" />
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollIndicator />
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-6 border-t border-[var(--border)] overflow-hidden">
        <SkillsCarousel skills={techStack} />
      </section>

      {/* ═══ FEATURED PROJECTS — pinned horizontal scroll ═══ */}
      <section className="border-t border-[var(--border)]">
        <HorizontalProjects projects={featuredProjects} />
        <div className="container-wide pb-24 -mt-8 md:mt-0 text-center">
          <ScrollReveal>
            <Link
              href="/projects"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRightIcon size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ABOUT PREVIEW — bento ═══ */}
      <section
        className="section cv-auto"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <SectionHeading
                label="About"
                title="Engineer by trade. Builder by obsession."
              />
              <p className="text-body text-base md:text-lg mb-6">
                I build software that ships and scales — from Rust-powered
                desktop apps and Go backend services to React frontends and
                React Native mobile apps. With {stats.projects}+ open-source
                projects, I focus on solving real problems with clean
                architecture.
              </p>
              <p className="text-body text-base md:text-lg mb-8">
                Currently building {now.building} ({now.buildingDescription})
                and SkillFest (production event management platform on
                Cloudflare).
              </p>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center gap-2"
              >
                More About Me
                <ArrowRightIcon size={14} />
              </Link>
            </ScrollReveal>

            <StaggerGrid className="grid grid-cols-2 gap-4">
              {areas.map((area) => (
                <StaggerItem key={area.label}>
                  <div
                    data-spotlight
                    className="card-lift p-5 rounded-xl h-full"
                    style={{
                      background: "var(--surface-1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="block mb-3"
                      style={{ color: "var(--brand)" }}
                    >
                      {area.icon}
                    </span>
                    <h4
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {area.label}
                    </h4>
                    <p
                      className="font-code text-[11px]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {area.detail}
                    </p>
                  </div>
                </StaggerItem>
              ))}
              <StaggerItem className="col-span-2">
                <NowWidget />
              </StaggerItem>
            </StaggerGrid>
          </div>
        </div>
      </section>

      {/* ═══ LATEST BLOG POSTS ═══ */}
      <section
        className="section cv-auto"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <SectionHeading
            label="Writing"
            title="Latest Blog Posts"
            description="Deep dives into AI, engineering philosophy, and the future of coding."
          />

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <article
                    data-spotlight
                    className="group card-lift flex flex-col h-full p-6 rounded-xl"
                    style={{
                      background: "var(--surface-1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="brand-mono text-[10px] font-bold uppercase tracking-wider mb-4"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {formatDate(post.date)} · {post.readTime}
                    </div>
                    <h3
                      className="text-xl font-bold tracking-tight mb-4 group-hover:text-gradient transition-all"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-body line-clamp-2 opacity-70 mb-8 flex-1">
                      {post.excerpt}
                    </p>
                    <div
                      className="flex items-center gap-2 brand-mono text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Read Post{" "}
                      <ArrowRightIcon
                        size={12}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <ScrollReveal delay={0.3} className="mt-12 text-center">
            <Link
              href="/blog"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Blog Posts
              <ArrowRightIcon size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        className="section cv-auto relative overflow-hidden"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, var(--brand-soft), transparent 70%)",
          }}
        />
        <div className="container-tight text-center relative">
          <ScrollReveal direction="scale">
            <h2
              className="heading-display text-h1 mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s build something
              <br />
              <span className="text-gradient-brand">ambitious</span> together.
            </h2>
            <p className="text-body text-lg mb-10 max-w-md mx-auto">
              Available for product collaborations, startup ideas, and technical
              consulting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">
                <span className="btn-primary gradient-border">
                  Get in Touch
                </span>
              </MagneticButton>
              <MagneticButton href="https://github.com/CodeMaverick-143">
                <span className="btn-secondary">
                  <GitHubIcon size={16} />
                  GitHub
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
