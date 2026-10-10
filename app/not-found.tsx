"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "@/data/navigation";

const ROUTES: Record<string, string> = {
  "~": "/",
  home: "/",
  ...Object.fromEntries(navLinks.map((l) => [l.label.toLowerCase(), l.href])),
};

/**
 * Branded 404: glitching code, and an interactive terminal that accepts
 * `ls`, `cd <page>`, `help` and `clear` to navigate away.
 */
export default function NotFound() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([
    "bash: route not found in this volume",
    'type "help" for commands',
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const [name, arg] = cmd.split(/\s+/);
    const echo = `❯ ${cmd}`;

    switch (name) {
      case "help":
        setHistory((h) => [
          ...h,
          echo,
          "ls — list pages · cd <page> — go there · clear — clear screen",
        ]);
        break;
      case "ls":
        setHistory((h) => [
          ...h,
          echo,
          Object.keys(ROUTES)
            .filter((k) => k !== "~")
            .join("  "),
        ]);
        break;
      case "clear":
        setHistory([]);
        break;
      case "cd": {
        const target =
          ROUTES[(arg ?? "~").replace(/^\//, "").toLowerCase()] ??
          ROUTES[arg ?? ""];
        if (target) {
          setHistory((h) => [...h, echo, `→ ${target}`]);
          window.setTimeout(() => router.push(target), 350);
        } else {
          setHistory((h) => [...h, echo, `cd: no such page: ${arg ?? ""}`]);
        }
        break;
      }
      default:
        setHistory((h) => [...h, echo, `command not found: ${name}`]);
    }
    setInput("");
  };

  return (
    <div className="noise min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.35]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 60%, var(--mesh-2), transparent 70%)",
        }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="glitch heading-display text-[clamp(6rem,20vw,11rem)] leading-none mb-4"
            data-text="404"
            style={{ color: "var(--text-primary)" }}
          >
            404
          </h1>
          <p
            className="brand-mono text-xs uppercase tracking-[0.4em] mb-10"
            style={{ color: "var(--text-tertiary)" }}
          >
            Resource Not Found
          </p>

          <h2
            className="heading-section text-2xl md:text-3xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            You&apos;ve reached an undocumented terminal.
          </h2>
          <p className="text-body text-base max-w-sm mx-auto mb-10">
            The path you&apos;re looking for doesn&apos;t exist in this volume.
            Use the terminal below or head back home.
          </p>

          {/* Interactive terminal */}
          <div
            className="terminal text-left max-w-md mx-auto mb-10 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="terminal-header">
              <div className="flex gap-1.5 px-1">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <span
                className="flex-1 text-center brand-mono text-[10px] uppercase tracking-widest"
                style={{ color: "#8a8a8a" }}
              >
                ~/lost — zsh
              </span>
              <div className="w-12" />
            </div>
            <div
              className="terminal-body !min-h-0 max-h-48 overflow-y-auto"
              data-lenis-prevent
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("❯")
                      ? "terminal-command"
                      : "terminal-output"
                  }
                >
                  {line}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(input);
                }}
                className="flex items-center gap-2"
              >
                <span className="terminal-prompt select-none">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                  className="flex-1 bg-transparent outline-none terminal-command font-code"
                />
              </form>
              <div ref={endRef} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary gradient-border">
              Return Home
            </Link>
            <Link href="/projects" className="btn-secondary">
              Browse Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
