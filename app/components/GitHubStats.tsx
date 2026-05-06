"use client";

import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import ScrollReveal from "./ScrollReveal";

interface Activity {
  date: string;
  count: number;
  level: number;
}

export default function GitHubStats() {
  const [totalContributions, setTotalContributions] = useState<number | null>(
    null,
  );

  const transformData = (data: Activity[]) => {
    const total = data.reduce(
      (sum: number, day: Activity) => sum + day.count,
      0,
    );
    // Update state in a microtask to avoid React's "render phase update" warning
    if (total !== totalContributions) {
      Promise.resolve().then(() => setTotalContributions(total));
    }
    return data;
  };

  return (
    <ScrollReveal>
      <div
        className="p-8 rounded-2xl mb-16"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Open Source Contributions
            </h3>
            <p className="text-sm text-body max-w-md">
              A snapshot of my daily commitment to building, shipping, and
              learning across the stack.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span
                className="block text-2xl font-bold tracking-tighter"
                style={{ color: "var(--text-primary)" }}
              >
                {totalContributions
                  ? `${totalContributions.toLocaleString()}`
                  : "..."}
              </span>
              <span
                className="brand-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Total contributions
              </span>
            </div>
            <div className="w-px h-10 bg-[var(--border)]" />
            <a
              href="https://github.com/CodeMaverick-143"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold hover:text-emerald-400 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              @CodeMaverick-143
            </a>
          </div>
        </div>

        <div className="flex justify-center overflow-hidden py-4">
          <GitHubCalendar
            username="CodeMaverick-143"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={{
              light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
            transformData={transformData}
            showColorLegend={false}
            showTotalCount={false}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
