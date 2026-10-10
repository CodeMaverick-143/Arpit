"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { fadeUpItem } from "@/lib/motion";
import TiltCard from "./TiltCard";
import TechIcon from "./TechIcon";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
  /** When true the card is a child of a staggered parent and skips its own in-view logic */
  inStagger?: boolean;
  /** Fixed-size variant for the horizontal scroller */
  compact?: boolean;
}

export default function ProjectCard({
  project,
  index = 0,
  featured = false,
  inStagger = false,
  compact = false,
}: ProjectCardProps) {
  const router = useRouter();
  const href = `/projects/${project.slug}`;

  const card = (
    <Link
      href={href}
      onMouseEnter={() => router.prefetch(href)}
      onFocus={() => router.prefetch(href)}
      className="block h-full rounded-[var(--radius-lg)]"
      aria-label={`${project.title} — ${project.tagline}`}
    >
      <TiltCard
        max={featured ? 4 : 7}
        className={`group ${featured ? "gradient-border gradient-border-hover" : ""} rounded-[var(--radius-lg)]`}
      >
        <div
          data-spotlight
          className="relative h-full overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-500 group-hover:shadow-[var(--shadow-lg)]"
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          {/* Project Image Area */}
          <div
            className="relative overflow-hidden"
            style={{
              height: compact ? "200px" : featured ? "320px" : "240px",
              background: "var(--surface-2)",
            }}
          >
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--background)]/40" />

            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={
                  featured
                    ? "(max-width: 1200px) 100vw, 800px"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                }
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="text-center px-6">
                  <span
                    className="brand-mono text-[10px] uppercase tracking-[0.4em] block mb-3 opacity-60"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {project.category[0]}
                  </span>
                  <h3
                    className={`heading-display ${compact ? "text-3xl" : "text-4xl md:text-5xl"}`}
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 z-10"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-center">
                <span className="btn-primary text-xs font-bold uppercase tracking-wider px-6 py-3 mb-4 inline-block">
                  View Case Study
                </span>
                <p className="text-[11px] font-medium tracking-wide text-white/60">
                  {project.role} · {project.year}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={compact ? "p-5" : "p-7"}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3
                  className="text-lg font-bold tracking-tight leading-tight truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="brand-mono text-[10px] uppercase tracking-wider mt-2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {project.role}
                </p>
              </div>
              <span className="flex-shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-colors group-hover:text-[var(--brand)]"
                  style={{ color: "var(--text-muted)" }}
                  aria-hidden
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </span>
            </div>

            <p className="text-[13.5px] leading-relaxed text-body mb-6 line-clamp-2">
              {project.tagline}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 brand-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm"
                  style={{
                    color: "var(--text-secondary)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <TechIcon name={tech} size={11} />
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span
                  className="brand-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm opacity-60"
                  style={{
                    color: "var(--text-tertiary)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </Link>
  );

  if (inStagger) {
    return (
      <motion.div
        variants={fadeUpItem}
        layout
        className={featured ? "md:col-span-2" : ""}
      >
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index, 4) * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={featured ? "md:col-span-2" : ""}
    >
      {card}
    </motion.div>
  );
}
