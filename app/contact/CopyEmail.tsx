"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../components/Toast";
import { MailIcon, CheckIcon } from "../components/Icons";

/** Email address with a one-click copy button. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast({ kind: "success", title: "Email copied to clipboard" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ kind: "error", title: "Couldn't copy", description: email });
    }
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full p-1 pl-4"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      <MailIcon size={14} />
      <a
        href={`mailto:${email}`}
        className="font-code text-[12px] px-2 py-2 hover:text-[var(--brand)] transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy email address"}
        className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--surface-2)] transition-colors"
        style={{ color: copied ? "var(--brand)" : "var(--text-tertiary)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <CheckIcon size={14} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
