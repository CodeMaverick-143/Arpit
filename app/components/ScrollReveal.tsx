'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1, once });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 30 }),
      ...(direction === 'down' && { y: -30 }),
      ...(direction === 'left' && { x: -30 }),
      ...(direction === 'right' && { x: 30 }),
      ...(direction === 'scale' && { scale: 0.95 }),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
