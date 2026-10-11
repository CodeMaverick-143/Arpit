"use client";

import dynamic from "next/dynamic";

/**
 * react-github-calendar renders differently on the server and client, which
 * breaks hydration — so it's loaded client-only with a shimmer skeleton.
 */
const GitHubStats = dynamic(() => import("./GitHubStats"), {
  ssr: false,
  loading: () => <GitHubStatsSkeleton />,
});

export default GitHubStats;

export function GitHubStatsSkeleton() {
  return (
    <div
      className="p-8 rounded-2xl mb-16"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
      aria-hidden
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-3">
          <div className="skeleton h-5 w-56" />
          <div className="skeleton h-3 w-80 max-w-full" />
        </div>
        <div className="skeleton h-10 w-28" />
      </div>
      <div className="skeleton h-28 w-full" />
    </div>
  );
}
