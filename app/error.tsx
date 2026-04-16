"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="noise min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.35]" />

      <div className="container-tight relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-8">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-red-500"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1
            className="heading-display text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            System Runtime Error
          </h1>
          <p
            className="brand-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            style={{ color: "var(--text-tertiary)" }}
          >
            Kernel Panic / Undefined Behavior
          </p>

          <p className="text-body text-base max-w-sm mx-auto mb-12">
            An unexpected error occurred during execution. This event has been
            logged for debugging.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => reset()} className="btn-primary">
              Reboot Terminal
            </button>
            <Link href="/" className="btn-secondary">
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
