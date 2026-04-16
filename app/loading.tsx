"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="noise min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.35]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-2 border-[var(--border)] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-2 border-2 border-[var(--text-muted)] rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="brand-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            System Loading
          </motion.p>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent w-32 mt-4"
            animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
