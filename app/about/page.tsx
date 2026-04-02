'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import { skillCategories, exploring } from '@/data/skills';
import {
  LayoutIcon,
  ServerIcon,
  SmartphoneIcon,
  DatabaseIcon,
  CpuIcon,
  TerminalSquareIcon,
  CodeIcon,
  ArrowUpRightIcon,
} from '../components/Icons';

function CategoryIcon({ name }: { name: string }) {
  const props = { size: 18 };
  switch (name) {
    case 'layout': return <LayoutIcon {...props} />;
    case 'server': return <ServerIcon {...props} />;
    case 'smartphone': return <SmartphoneIcon {...props} />;
    case 'database': return <DatabaseIcon {...props} />;
    case 'cpu': return <CpuIcon {...props} />;
    case 'terminal': return <TerminalSquareIcon {...props} />;
    default: return <CodeIcon {...props} />;
  }
}

export default function AboutPage() {
  // Flatten skill count for the hero stat
  const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-px bg-[var(--border)]" />
              <span className="brand-mono text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-tertiary)' }}>
                About
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-display text-5xl md:text-8xl mb-12 tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              I build software that
              <br />
              <span className="text-gradient">ships and scales.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-body text-lg md:text-xl space-y-8 max-w-3xl leading-relaxed"
            >
              <p>
                I&apos;m a full-stack engineer who builds across the entire stack — from Rust-powered
                desktop apps and Go backend services to React frontends and React Native mobile apps.
                I believe in shipping real products, not just prototypes.
              </p>
              <p>
                With 23+ open-source projects spanning web, mobile, systems programming, and AI,
                I focus on building software that solves real problems with clean architecture
                and production-grade quality.
              </p>
              <p>
                Currently building IdeaToIPO — an AI-powered multi-agent platform for startup founders —
                and SkillFest, a production event management platform deployed on Cloudflare.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ HOW I BUILD ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-wide">
          <SectionHeading
            label="Philosophy"
            title="How I Build"
            description="Principles that guide my engineering and product decisions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ServerIcon size={22} />,
                title: 'Ship Fast, Iterate Faster',
                description: 'I believe in getting to users quickly. Perfect is the enemy of shipped. Build the smallest thing that validates the assumption, then improve ruthlessly based on real feedback.',
              },
              {
                icon: <CpuIcon size={22} />,
                title: 'Systems Thinking First',
                description: 'Every feature is part of a larger system. I think about data flow, failure modes, and scaling characteristics before writing the first line of code. Architecture decisions compound.',
              },
              {
                icon: <PenToolIcon size={22} />,
                title: 'Craft Matters',
                description: 'Performance, design quality, and developer experience aren\'t nice-to-haves — they\'re competitive advantages. Users can feel the difference between thoughtful and thoughtless software.',
              },
            ].map((principle, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="p-8 rounded-xl h-full"
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="block mb-4" style={{ color: 'var(--text-secondary)' }}>{principle.icon}</span>
                  <h3
                    className="text-lg font-semibold tracking-tight mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {principle.title}
                  </h3>
                  <p className="text-sm text-body">{principle.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SKILLS — PREMIUM DEVELOPER SECTION ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-wide">
          <SectionHeading
            label="Capabilities"
            title="Technical Skills"
            description={`${totalSkills} skills across ${skillCategories.length} domains — each one earned through real projects, not tutorials.`}
          />


          {/* Category Blocks */}
          <div className="space-y-16">
            {skillCategories.map((category, ci) => (
              <ScrollReveal key={category.name} delay={ci * 0.06}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <CategoryIcon name={category.iconName} />
                  </span>
                  <div>
                    <h3
                      className="text-sm font-bold uppercase tracking-[0.1em]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {category.name}
                    </h3>
                    <span className="brand-mono text-[10px] font-bold uppercase tracking-wider mt-1 block" style={{ color: 'var(--text-muted)' }}>
                      {category.skills.length} technical skill{category.skills.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Skill Cards Grid */}
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
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-tight">
          <SectionHeading
            label="Currently"
            title="What I'm Exploring"
            description="Areas I'm actively learning and building in."
          />

          <div className="space-y-4">
            {exploring.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300 hover:translate-x-2"
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span
                    className="font-code text-xs flex-shrink-0 w-8 text-center"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item}
                  </span>
                  <span className="ml-auto flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                    <ArrowUpRightIcon size={14} />
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PenToolIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
