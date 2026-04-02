'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import type { Experience } from '@/data/experience';

interface TimelineProps {
  items: Experience[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div
        className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
        style={{ background: 'var(--border)' }}
      />

      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex items-start gap-8 mb-16 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-[14px] h-[14px] rounded-full border-2"
          style={{
            borderColor: item.type === 'founding' ? '#10b981' : 'var(--text-muted)',
            background: item.type === 'founding' ? '#10b981' : 'var(--surface-0)',
          }}
        />
      </div>

      {/* Content */}
      <div className={`flex-1 pl-10 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
        <div className="md:max-w-md" style={{ marginLeft: isLeft ? 'auto' : undefined }}>
          {/* Type Badge */}
          <span
            className="inline-block brand-mono text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-sm mb-4"
            style={{
              color: item.type === 'founding' ? '#10b981' : 'var(--text-tertiary)',
              background: item.type === 'founding' ? 'rgba(16,185,129,0.08)' : 'var(--surface-2)',
              border: `1px solid ${item.type === 'founding' ? 'rgba(16,185,129,0.2)' : 'var(--border)'}`,
            }}
          >
            {item.type}
          </span>

          {/* Header */}
          <h3
            className="text-2xl font-bold tracking-tight mb-2 leading-none"
            style={{ color: 'var(--text-primary)' }}
          >
            {item.role}
          </h3>
          <p className="text-[15px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            {item.company}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
            <span className="brand-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {item.period}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <span className="brand-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {item.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-[14px] leading-relaxed text-body mb-6">{item.description}</p>

          {/* Achievements */}
          <ul className={`space-y-3 mb-8 ${isLeft ? 'md:ml-auto' : ''}`}>
            {item.achievements.slice(0, 3).map((achievement, i) => (
              <li
                key={i}
                className={`text-[13px] leading-relaxed flex items-start gap-3 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0 bg-emerald-500/50" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="brand-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
