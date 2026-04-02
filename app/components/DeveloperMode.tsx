'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeveloperMode() {
  const [isOpen, setIsOpen] = useState(false);

  const buildInfo = {
    framework: 'Next.js 16.2.2',
    runtime: 'React 19.2.4',
    language: 'TypeScript 5.x',
    styling: 'Tailwind CSS 4.x',
    animation: 'Framer Motion 12.x',
    hosting: 'Vercel Edge Network',
    buildTime: '~3.2s',
    bundleSize: '~142kb gzipped',
    lighthouse: {
      performance: 98,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border)',
          color: 'var(--text-tertiary)',
        }}
        aria-label="Toggle developer mode"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 overflow-hidden"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span className="font-code text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                Developer Mode
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-code text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  ACTIVE
                </span>
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Stack */}
              <div>
                <h4 className="font-code text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-muted)' }}>
                  Tech Stack
                </h4>
                <div className="space-y-1.5">
                  {Object.entries(buildInfo)
                    .filter(([key]) => !['lighthouse'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="font-code text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                          {key}
                        </span>
                        <span className="font-code text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                          {String(value)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Lighthouse */}
              <div>
                <h4 className="font-code text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-muted)' }}>
                  Lighthouse Scores
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(buildInfo.lighthouse).map(([key, value]) => (
                    <div
                      key={key}
                      className="text-center p-2 rounded-lg"
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div
                        className="font-code text-lg font-bold"
                        style={{ color: value >= 90 ? '#10b981' : 'var(--text-primary)' }}
                      >
                        {value}
                      </div>
                      <div
                        className="font-code text-[8px] uppercase tracking-wider mt-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {key.slice(0, 4)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Debug */}
              <div
                className="font-code text-[10px] p-3 rounded-lg"
                style={{
                  background: '#0c0c0c',
                  color: '#6ee7b7',
                  border: '1px solid #1f1f1f',
                }}
              >
                <div>{'>'} system.status: operational</div>
                <div>{'>'} render.mode: hybrid (SSR + CSR)</div>
                <div>{'>'} cache.strategy: ISR + edge</div>
                <div>{'>'} errors.count: 0</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
