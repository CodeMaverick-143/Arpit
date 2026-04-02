'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface SkillBadgeProps {
  name: string;
  index: number;
}

export default function SkillBadge({ name, index }: SkillBadgeProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-500 cursor-default"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all duration-300" />
        <span className="brand-mono text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          {name}
        </span>
      </div>
    </motion.div>
  );
}
