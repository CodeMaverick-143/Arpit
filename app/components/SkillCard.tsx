'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/data/skills';

const variantConfig: Record<Skill['colorVariant'], { color: string; bg: string; border: string; width: string }> = {
  emerald: { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', width: '92%' },
  blue:    { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', width: '84%' },
  violet:  { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', width: '76%' },
  amber:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', width: '68%' },
  slate:   { color: '#6b7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.2)', width: '60%' },
};

const proofIcons: Record<string, string> = {
  Production: '●',
  'Built Projects': '◈',
  'Open Source': '⬡',
  'Used in Startup': '▲',
  Learning: '◎',
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const config = variantConfig[skill.colorVariant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      whileHover={{ y: -3, scale: 1.015 }}
      className="group relative rounded-xl p-[1px] transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${config.border}, transparent 60%)`,
      }}
    >
      <div
        className="relative rounded-xl p-4 h-full overflow-hidden transition-all duration-300"
        style={{
          background: 'var(--surface-1)',
        }}
      >
        {/* Subtle gradient glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${config.bg}, transparent 70%)`,
          }}
        />

        {/* Top row: name + subtle indicator */}
        <div className="relative flex items-center justify-between gap-3 mb-3">
          <h4
            className="text-[13px] font-bold tracking-tight truncate leading-none"
            style={{ color: 'var(--text-primary)' }}
          >
            {skill.name}
          </h4>
          <div 
            className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
            style={{ 
              background: config.color,
              boxShadow: `0 0 10px ${config.color}66`
            }}
          />
        </div>

        {/* Detail line */}
        <p
          className="relative text-[11px] leading-relaxed mb-4 font-medium h-[32px] overflow-hidden line-clamp-2"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {skill.detail}
        </p>

        {/* Bottom row: proof signal + thin gradient line */}
        <div className="relative flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="brand-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              <span className="mr-1" style={{ color: config.color }}>
                {proofIcons[skill.proof] || '●'}
              </span>
              {skill.proof}
            </span>
          </div>
          <div className="flex-1 h-[1.5px] rounded-full overflow-hidden" style={{ background: 'var(--surface-3)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: config.width }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${config.color}44, ${config.color})`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
