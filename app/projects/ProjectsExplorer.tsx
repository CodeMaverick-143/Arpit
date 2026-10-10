"use client";

import { useCallback, useDeferredValue, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects, categories, type Category } from "@/data/projects";
import { staggerContainer } from "@/lib/motion";

/**
 * Filter + search over the project list. State lives in the URL
 * (`?category=AI&q=rust`) so results are shareable and survive refresh.
 */
export default function ProjectsExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const rawCategory = params.get("category") ?? "All";
  const activeCategory: Category = (categories as readonly string[]).includes(
    rawCategory,
  )
    ? (rawCategory as Category)
    : "All";
  const query = params.get("q") ?? "";
  const deferredQuery = useDeferredValue(query);

  const update = useCallback(
    (next: { category?: string; q?: string }) => {
      const sp = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(next)) {
        if (!v || v === "All") sp.delete(k);
        else sp.set(k, v);
      }
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory =
        activeCategory === "All" ||
        p.category.includes(activeCategory as Exclude<Category, "All">);
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.tagline,
        p.description,
        ...p.tech,
        ...p.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, deferredQuery]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-14">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          <LayoutGroup id="project-filters">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => update({ category: cat })}
                  className="relative px-5 min-h-10 brand-mono text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 cursor-pointer"
                  style={{
                    color: active
                      ? "var(--background)"
                      : "var(--text-tertiary)",
                    border: `1px solid ${active ? "transparent" : "var(--border)"}`,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <label className="relative md:ml-auto md:w-72">
          <span className="sr-only">Search projects</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-muted)" }}
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search by name, stack…"
            className="w-full pl-10 pr-4 h-10 text-sm rounded-full outline-none transition-all focus:ring-1 focus:ring-[var(--brand)]"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </label>
      </div>

      {/* Result count (live region for screen readers) */}
      <p className="sr-only" aria-live="polite">
        {filtered.length} projects shown
      </p>

      {/* Grid — cards animate between positions when the filter changes */}
      <motion.div
        layout
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.04 }}
              className={
                project.featured &&
                i === 0 &&
                activeCategory === "All" &&
                !query
                  ? "md:col-span-2"
                  : ""
              }
            >
              <ProjectCard
                project={project}
                index={i}
                featured={
                  project.featured &&
                  i === 0 &&
                  activeCategory === "All" &&
                  !query
                }
                inStagger
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p
            className="brand-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            $ grep -ri &quot;{query}&quot; ./projects
          </p>
          <p className="text-body text-lg mb-6">
            No matches. Try a different term or category.
          </p>
          <button
            onClick={() => update({ q: "", category: "All" })}
            className="btn-secondary cursor-pointer"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
