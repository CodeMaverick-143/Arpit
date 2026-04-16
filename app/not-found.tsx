"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="noise min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.35]" />

      <div className="container-tight relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="heading-display text-8xl md:text-9xl mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            404
          </h1>
          <p
            className="brand-mono text-xs uppercase tracking-[0.4em] mb-12"
            style={{ color: "var(--text-tertiary)" }}
          >
            Resource Not Found
          </p>

          <h2
            className="heading-section text-2xl md:text-3xl mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            You&apos;ve reached an <br />
            undocumented terminal.
          </h2>

          <p className="text-body text-base max-w-sm mx-auto mb-12">
            The path you are looking for does not exist in this volume. Return
            to the main node to continue navigation.
          </p>

          <div className="flex justify-center">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
