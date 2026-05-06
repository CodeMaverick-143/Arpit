"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SplitText from "./components/SplitText";
import Terminal from "./components/Terminal";
import ScrollIndicator from "./components/ScrollIndicator";
import ScrollReveal from "./components/ScrollReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import SkillsCarousel from "./components/SkillsCarousel";
import MagneticButton from "./components/MagneticButton";
import ProjectCard from "./components/ProjectCard";
import SectionHeading from "./components/SectionHeading";
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
    text: "Building IdeaToIPO — AI multi-agent platform",
    delay: 400,
  },
  { type: "empty" as const, text: "", delay: 200 },
  { type: "command" as const, text: "ls ~/projects | wc -l", delay: 700 },
  { type: "output" as const, text: "23 open-source repositories", delay: 500 },
];

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <div className="noise">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[calc(100vh-var(--nav-height))] flex flex-col justify-center">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 grid-pattern opacity-[0.35]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.08), transparent)",
          }}
        />

        <div className="container-wide relative z-10 py-20 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text Content */}
            <div>
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className="font-code text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Available for collaborations
                </span>
              </motion.div>

              {/* Name */}
              <SplitText
                text={siteConfig.name}
                className="heading-display text-6xl md:text-8xl mb-6 tracking-[-0.05em]"
                delay={0.4}
                staggerDelay={0.06}
                as="h1"
              />

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="brand-mono text-[12px] md:text-[13px] uppercase tracking-[0.2em] mb-8"
                style={{ color: "var(--text-tertiary)" }}
              >
                {siteConfig.title}
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-lg md:text-xl text-body max-w-xl mb-12 leading-relaxed"
              >
                {siteConfig.tagline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <MagneticButton href="/projects">
                  <span className="btn-primary">
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
              </motion.div>

              {/* Metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="flex gap-12"
              >
                {[
                  { value: 23, suffix: "+", label: "Projects" },
                  { value: 8, suffix: "+", label: "Core stacks" },
                  { value: 4, suffix: "+", label: "Mobile" },
                ].map((metric, i) => (
                  <div key={i}>
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      className="heading-display text-4xl md:text-5xl"
                      duration={2.5}
                    />
                    <p
                      className="brand-mono text-[9px] uppercase tracking-[0.2em] mt-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {metric.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as [
                  number,
                  number,
                  number,
                  number,
                ],
              }}
              className="hidden lg:block"
            >
              <Terminal lines={terminalLines} title="~/arpitsarang — zsh" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollIndicator />
        </div>
      </section>

      {/* ═══ TECH STACK CAROUSEL ═══ */}
      <section className="py-12 border-t border-[var(--border)] overflow-hidden">
        <SkillsCarousel skills={techStack} />
      </section>

      {/* ═══ FEATURED PROJECTS ═══ */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <SectionHeading
            label="Selected Work"
            title="Featured Projects"
            description="A curated selection of projects across full-stack web, desktop apps, mobile, systems programming, and AI."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                featured={i === 0}
              />
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-12 text-center">
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

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section
        className="section"
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
                React Native mobile apps. With 23+ open-source projects, I focus
                on solving real problems with clean architecture.
              </p>
              <p className="text-body text-base md:text-lg mb-8">
                Currently building IdeaToIPO (AI multi-agent platform) and
                SkillFest (production event management platform on Cloudflare).
              </p>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center gap-2"
              >
                More About Me
                <ArrowRightIcon size={14} />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
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
                ].map((area) => (
                  <motion.div
                    key={area.label}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-5 rounded-xl transition-all"
                    style={{
                      background: "var(--surface-1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="block mb-3"
                      style={{ color: "var(--text-secondary)" }}
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
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ LATEST BLOG POSTS ═══ */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <SectionHeading
            label="Writing"
            title="Latest Blog Posts"
            description="Deep dives into AI, engineering philosophy, and the future of coding."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="group flex flex-col h-full p-6 rounded-xl transition-all duration-300 hover:border-[var(--text-muted)]"
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
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

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

      {/* ═══ CTA SECTION ═══ */}

      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="container-tight text-center">
          <ScrollReveal>
            <h2
              className="heading-display text-3xl md:text-5xl mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s build something
              <br />
              ambitious together.
            </h2>
            <p className="text-body text-lg mb-10 max-w-md mx-auto">
              Available for product collaborations, startup ideas, and technical
              consulting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">
                <span className="btn-primary">Get in Touch</span>
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
