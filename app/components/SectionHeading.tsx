'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`mb-16 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-[var(--border)]" />
          <span className="brand-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-tertiary)' }}>
            {label}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="heading-section text-4xl md:text-5xl mb-6 tracking-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body text-base md:text-lg leading-relaxed max-w-xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
