"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";
import ScrollReveal from "../../components/ScrollReveal";
import ScrollProgress from "../../components/ScrollProgress";
import ScrollSpyNav from "../../components/ScrollSpyNav";
import CodeBlock from "../../components/CodeBlock";
import RevealText from "../../components/RevealText";
import { GitHubIcon, ArrowRightIcon } from "../../components/Icons";
import TechIcon from "../../components/TechIcon";
import { ease } from "@/lib/motion";

interface ProjectContentProps {
  project: Project;
  prev: Project;
  next: Project;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "process", label: "Process" },
  { id: "architecture", label: "Architecture" },
  { id: "outcome", label: "Outcome" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: ease.out },
});

export default function ProjectContent({
  project,
  prev,
  next,
}: ProjectContentProps) {
  const ext =
    project.caseStudy.codeLanguage === "python"
      ? "py"
      : project.caseStudy.codeLanguage === "rust"
        ? "rs"
        : "ts";

  return (
    <div className="noise">
      <ScrollProgress />

      {/* ═══ HERO ═══ */}
      <section className="section-sm relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 0%, var(--brand-soft), transparent 60%)",
          }}
        />
        <div className="container-wide relative">
          {/* Breadcrumb */}
          <motion.nav aria-label="Breadcrumb" {...fade(0)} className="mb-8">
            <ol className="flex items-center gap-2 font-code text-xs">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[var(--text-primary)]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Home
                </Link>
              </li>
              <li aria-hidden style={{ color: "var(--text-muted)" }}>
                /
              </li>
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-[var(--text-primary)]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden style={{ color: "var(--text-muted)" }}>
                /
              </li>
              <li
                aria-current="page"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.title}
              </li>
            </ol>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div {...fade(0.05)} className="flex flex-wrap gap-2 mb-4">
              {project.category.map((cat) => (
                <span key={cat} className="badge">
                  {cat}
                </span>
              ))}
              <span className="badge">{project.year}</span>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              className="heading-display text-h1 mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </motion.h1>

            <motion.p {...fade(0.15)} className="text-lead text-body mb-8">
              {project.tagline}
            </motion.p>

            <motion.dl {...fade(0.2)} className="flex flex-wrap gap-6 mb-8">
              {[
                ["Role", project.role],
                ["Year", project.year],
                ["Stack", project.tech.slice(0, 3).join(", ")],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt
                    className="font-code text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {k}
                  </dt>
                  <dd
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.div {...fade(0.25)} className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <GitHubIcon size={16} />
                  Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary gradient-border"
                >
                  Live Product
                  <ArrowRightIcon size={14} />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDY ═══ */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-wide py-16">
          <div className="flex gap-16">
            <aside className="hidden lg:block w-48 flex-shrink-0">
              <div className="sticky top-28">
                <ScrollSpyNav sections={sections} />
              </div>
            </aside>

            <div className="flex-1 max-w-2xl">
              <div className="space-y-20">
                <Section id="overview" title="Overview">
                  <RevealText
                    text={project.caseStudy.overview}
                    className="text-body text-lg"
                  />
                </Section>

                <Section id="problem" title="Problem">
                  <p className="text-body text-base">
                    {project.caseStudy.problem}
                  </p>
                </Section>

                <Section id="solution" title="Solution">
                  <p className="text-body text-base">
                    {project.caseStudy.solution}
                  </p>
                </Section>

                {project.caseStudy.codeSnippet && (
                  <ScrollReveal>
                    <CodeBlock
                      code={project.caseStudy.codeSnippet}
                      language={project.caseStudy.codeLanguage || "typescript"}
                      filename={`${project.slug}.${ext}`}
                    />
                  </ScrollReveal>
                )}

                <Section id="process" title="Process">
                  <p className="text-body text-base">
                    {project.caseStudy.process}
                  </p>
                </Section>

                <Section id="architecture" title="Architecture">
                  <p className="text-body text-base">
                    {project.caseStudy.architecture}
                  </p>
                </Section>

                <ScrollReveal>
                  <h3
                    className="heading-section text-xl mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="badge group">
                        <TechIcon name={tech} size={14} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                <Section id="outcome" title="Outcome & Results">
                  <p className="text-body text-base">
                    {project.caseStudy.outcome}
                  </p>
                </Section>

                {/* Prev / Next */}
                <nav
                  aria-label="Adjacent projects"
                  className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <AdjacentLink project={prev} direction="prev" />
                  <AdjacentLink project={next} direction="next" />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <section id={id} className="scroll-mt-28">
        <h2
          className="heading-section text-2xl mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
        {children}
      </section>
    </ScrollReveal>
  );
}

function AdjacentLink({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-spotlight
      className={`group card-lift flex flex-col gap-2 p-6 rounded-2xl ${isNext ? "sm:text-right sm:items-end" : ""}`}
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="brand-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--text-muted)" }}
      >
        {isNext ? "Next →" : "← Previous"}
      </span>
      <span
        className="text-lg font-bold tracking-tight group-hover:text-[var(--brand)] transition-colors"
        style={{ color: "var(--text-primary)" }}
      >
        {project.title}
      </span>
      <span className="text-[13px] text-body line-clamp-1">
        {project.tagline}
      </span>
    </Link>
  );
}
