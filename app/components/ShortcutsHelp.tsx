"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const shortcuts = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["/"], label: "Open command palette" },
  { keys: ["T"], label: "Toggle light / dark theme" },
  { keys: ["?"], label: "Show this help" },
  { keys: ["Esc"], label: "Close dialogs" },
  { keys: ["Tab"], label: "Move focus (dialogs trap focus)" },
];

interface ShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

/** Keyboard shortcuts modal, toggled with `?`. */
export default function ShortcutsHelp({ open, onClose }: ShortcutsHelpProps) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm p-6"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                id="shortcuts-title"
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Keyboard shortcuts
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--surface-2)] cursor-pointer"
                style={{ color: "var(--text-tertiary)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2.5">
              {shortcuts.map((s) => (
                <li
                  key={s.label + s.keys.join()}
                  className="flex items-center justify-between gap-4"
                >
                  <span
                    className="text-[13px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.label}
                  </span>
                  <span className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded font-code text-[11px]"
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
