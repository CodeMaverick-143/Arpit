"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/motion";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  description?: string;
}

const ToastContext = createContext<{
  toast: (t: Omit<ToastItem, "id">) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const colors: Record<ToastKind, string> = {
  success: "var(--text-primary)",
  error: "var(--text-primary)",
  info: "var(--text-tertiary)",
};

/** Minimal toast system — no deps, keyboard/screen-reader friendly. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = ++counter.current;
      setItems((prev) => [...prev, { ...t, id }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] flex flex-col gap-2 w-[min(92vw,380px)] pointer-events-none"
      >
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              role="status"
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.35, ease: ease.expo }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl glass"
            >
              <span
                className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: colors[t.kind],
                  boxShadow: `0 0 10px ${colors[t.kind]}`,
                }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.title}
                </p>
                {t.description && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="w-7 h-7 -mr-1 -mt-1 rounded-full flex items-center justify-center hover:bg-[var(--surface-2)] cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                <svg
                  width="12"
                  height="12"
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
