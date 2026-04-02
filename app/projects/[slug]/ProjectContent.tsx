'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/projects';
import ScrollReveal from '../../components/ScrollReveal';
import CodeBlock from '../../components/CodeBlock';

interface ProjectContentProps {
  slug: string;
}

export default function ProjectContent({ slug }: ProjectContentProps) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section text-center">
        <div className="container-tight">
          <h1 className="heading-display text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
            Project Not Found
          </h1>
          <Link href="/projects" className="btn-secondary">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'process', label: 'Process' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'outcome', label: 'Outcome' },
  ];

  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="section">
        <div className="container-wide">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <Link
              href="/projects"
              className="font-code text-xs transition-colors hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Projects
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span className="font-code text-xs" style={{ color: 'var(--text-secondary)' }}>
              {project.title}
            </span>
          </motion.div>

          <div className="max-w-3xl">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {project.category.map((cat) => (
                <span key={cat} className="badge">{cat}</span>
              ))}
              <span className="badge">{project.year}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="heading-display text-4xl md:text-5xl mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-body mb-8"
            >
              {project.tagline}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div>
                <span className="font-code text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Role
                </span>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {project.role}
                </span>
              </div>
              <div>
                <span className="font-code text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Year
                </span>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {project.year}
                </span>
              </div>
              <div>
                <span className="font-code text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Stack
                </span>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {project.tech.slice(0, 3).join(', ')}
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Source Code
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Live Product →
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDY CONTENT ═══ */}
      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-wide py-16">
          <div className="flex gap-16">
            {/* Sticky Side Nav */}
            <aside className="hidden lg:block w-48 flex-shrink-0">
              <div className="sticky top-24">
                <span
                  className="font-code text-[10px] uppercase tracking-[0.2em] block mb-4"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Contents
                </span>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm transition-colors hover:text-[var(--text-primary)]"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-2xl">
              <div className="space-y-16">
                {/* Overview */}
                <ScrollReveal>
                  <div id="overview">
                    <h2 className="heading-section text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Overview
                    </h2>
                    <p className="text-body text-base">{project.caseStudy.overview}</p>
                  </div>
                </ScrollReveal>

                {/* Problem */}
                <ScrollReveal>
                  <div id="problem">
                    <h2 className="heading-section text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Problem
                    </h2>
                    <p className="text-body text-base">{project.caseStudy.problem}</p>
                  </div>
                </ScrollReveal>

                {/* Solution */}
                <ScrollReveal>
                  <div id="solution">
                    <h2 className="heading-section text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Solution
                    </h2>
                    <p className="text-body text-base">{project.caseStudy.solution}</p>
                  </div>
                </ScrollReveal>

                {/* Code Snippet */}
                {project.caseStudy.codeSnippet && (
                  <ScrollReveal>
                    <CodeBlock
                      code={project.caseStudy.codeSnippet}
                      language={project.caseStudy.codeLanguage || 'typescript'}
                      filename={`${project.slug}.${project.caseStudy.codeLanguage === 'python' ? 'py' : project.caseStudy.codeLanguage === 'rust' ? 'rs' : 'ts'}`}
                    />
                  </ScrollReveal>
                )}

                {/* Process */}
                <ScrollReveal>
                  <div id="process">
                    <h2 className="heading-section text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Process
                    </h2>
                    <p className="text-body text-base">{project.caseStudy.process}</p>
                  </div>
                </ScrollReveal>

                {/* Architecture */}
                <ScrollReveal>
                  <div id="architecture">
                    <h2 className="heading-section text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Architecture
                    </h2>
                    <p className="text-body text-base">{project.caseStudy.architecture}</p>
                  </div>
                </ScrollReveal>

                {/* Tech Stack Grid */}
                <ScrollReveal>
                  <div>
                    <h3 className="heading-section text-xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Outcome */}
                <ScrollReveal>
                  <div id="outcome">
                    <h2 className="heading-section text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      Outcome & Results
                    </h2>
                    <p className="text-body text-base">{project.caseStudy.outcome}</p>
                  </div>
                </ScrollReveal>

                {/* Navigation */}
                <div
                  className="pt-12 flex items-center justify-between"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <Link href="/projects" className="btn-secondary">
                    ← All Projects
                  </Link>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
