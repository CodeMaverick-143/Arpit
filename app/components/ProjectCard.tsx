'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { useInView } from '@/hooks/useInView';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className="group relative overflow-hidden cursor-pointer transition-all duration-500"
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          {/* Project Image Area */}
          <div
            className="relative overflow-hidden"
            style={{
              height: featured ? '280px' : '200px',
              background: 'var(--surface-2)',
            }}
          >
            {/* Abstract Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
              <div className="text-center px-6">
                <span
                  className="brand-mono text-[10px] uppercase tracking-[0.4em] block mb-3"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {project.category[0]}
                </span>
                <h3
                  className="heading-display text-3xl md:text-4xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            >
              <span className="btn-primary text-xs font-bold uppercase tracking-wider px-6 py-3">View Case Study</span>
            </div>

            {/* Year Badge */}
          </div>

          {/* Content */}
          <div className="p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3
                  className="text-lg font-bold tracking-tight group-hover:text-[var(--text-primary)] transition-colors leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="brand-mono text-[10px] uppercase tracking-wider mt-2"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {project.role}
                </p>
              </div>
              <motion.div
                className="flex-shrink-0 mt-1"
                whileHover={{ x: 4, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </motion.div>
            </div>

            <p className="text-[13.5px] leading-relaxed text-body mb-6 line-clamp-2">
              {project.tagline}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="brand-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm"
                  style={{
                    color: 'var(--text-secondary)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span
                  className="brand-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm opacity-60"
                  style={{
                    color: 'var(--text-tertiary)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
