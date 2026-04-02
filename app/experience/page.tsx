'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';
import { experiences } from '@/data/experience';

export default function ExperiencePage() {
  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="section-sm">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-px bg-[var(--border)]" />
              <span className="brand-mono text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-tertiary)' }}>
                Career
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-display text-5xl md:text-8xl mb-8 tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              From building open-source projects and shipping production platforms to founding
              AI-powered products. Here&apos;s the journey so far.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-wide">
          <Timeline items={experiences} />
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section className="section-sm" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '23+', label: 'Projects Shipped' },
              { value: '8+', label: 'Technologies' },
              { value: '4', label: 'Mobile Apps' },
              { value: '2', label: 'Live Products' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border)',
                }}
              >
            {i % 2 === 0 ? (
                <div className="heading-display text-4xl md:text-5xl mb-3 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
              ) : (
                <div className="heading-display text-4xl md:text-5xl mb-3 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
              )}
                <p className="brand-mono text-[9px] font-bold uppercase tracking-[0.2em] opacity-60" style={{ color: 'var(--text-tertiary)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
