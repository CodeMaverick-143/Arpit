"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { commandItems } from "@/data/navigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useTheme } from "./ThemeProvider";
import ShortcutsHelp from "./ShortcutsHelp";

function isTypingTarget(el: EventTarget | null) {
  const t = el as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    t.isContentEditable
  );
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toggleTheme } = useTheme();
  useFocusTrap(panelRef, isOpen);

  const q = query.toLowerCase();
  const filtered = commandItems.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q)),
  );

  const grouped = filtered.reduce<Record<string, typeof commandItems>>(
    (acc, item) => {
      (acc[item.section] ??= []).push(item);
      return acc;
    },
    {},
  );

  const flatFiltered = Object.values(grouped).flat();

  const open = useCallback(() => {
    setSelectedIndex(0);
    setQuery("");
    setIsOpen(true);
  }, []);

  const handleSelect = useCallback(
    (item: (typeof commandItems)[0]) => {
      setIsOpen(false);
      setQuery("");
      if (item.href.startsWith("http") || item.href.endsWith(".pdf")) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [router],
  );

  // Global shortcuts: ⌘K / Ctrl+K and "/" open the palette, "?" opens help,
  // "t" toggles theme. Single-key shortcuts are ignored while typing.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setHelpOpen(false);
        if (isOpen) setIsOpen(false);
        else open();
        return;
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setHelpOpen(false);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target))
        return;
      if (isOpen) return;

      if (e.key === "/") {
        e.preventDefault();
        open();
      } else if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
      } else if (e.key.toLowerCase() === "t") {
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", open);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", open);
    };
  }, [isOpen, open, toggleTheme]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Keep the selected row in view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${selectedIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
      handleSelect(flatFiltered[selectedIndex]);
    }
  };

  return (
    <>
      <ShortcutsHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] px-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Palette */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ scale: 0.96, opacity: 0, y: -8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-lg overflow-hidden gradient-border"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-xl)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div
                className="flex items-center gap-3 px-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--text-tertiary)", flexShrink: 0 }}
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-results"
                  aria-activedescendant={
                    flatFiltered[selectedIndex]
                      ? `cmd-${flatFiltered[selectedIndex].id}`
                      : undefined
                  }
                  placeholder="Type a command or search…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyNavigation}
                  className="w-full py-4 bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
                  style={{ color: "var(--text-primary)" }}
                />
                <kbd
                  className="font-code text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    color: "var(--text-muted)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                id="command-results"
                ref={listRef}
                role="listbox"
                className="max-h-72 overflow-y-auto py-2"
                data-lenis-prevent
              >
                {Object.entries(grouped).map(([section, items]) => (
                  <div key={section} role="group" aria-label={section}>
                    <div
                      className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {section}
                    </div>
                    {items.map((item) => {
                      const globalIndex = flatFiltered.indexOf(item);
                      const selected = globalIndex === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          id={`cmd-${item.id}`}
                          role="option"
                          aria-selected={selected}
                          data-index={globalIndex}
                          onClick={() => handleSelect(item)}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-sm transition-colors cursor-pointer"
                          style={{
                            color: selected
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                            background: selected
                              ? "var(--surface-2)"
                              : "transparent",
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <span
                            className="w-1 h-4 rounded-full transition-opacity"
                            style={{
                              background: "var(--brand)",
                              opacity: selected ? 1 : 0,
                            }}
                          />
                          <span className="font-medium">{item.label}</span>
                          {item.href.startsWith("http") && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              style={{
                                color: "var(--text-muted)",
                                marginLeft: "auto",
                              }}
                              aria-hidden
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {flatFiltered.length === 0 && (
                  <div
                    className="px-4 py-8 text-center text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No results found
                  </div>
                )}
              </div>

              {/* Footer hints */}
              <div
                className="flex items-center gap-4 px-4 py-2.5 brand-mono text-[10px]"
                style={{
                  borderTop: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  background: "var(--surface-0)",
                }}
              >
                <span>
                  <Kbd>↑↓</Kbd> navigate
                </span>
                <span>
                  <Kbd>↵</Kbd> open
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setHelpOpen(true);
                  }}
                  className="ml-auto hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <Kbd>?</Kbd> all shortcuts
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-flex items-center justify-center min-w-[18px] px-1 py-px rounded mr-1 font-code text-[10px]"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        color: "var(--text-tertiary)",
      }}
    >
      {children}
    </kbd>
  );
}
