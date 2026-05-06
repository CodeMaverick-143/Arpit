"use client";

import { useState, useRef } from "react";

const skillToIcon: Record<string, string> = {
  TypeScript: "devicon-typescript-plain",
  JavaScript: "devicon-javascript-plain",
  Python: "devicon-python-plain",
  Go: "devicon-go-original-wordmark",
  Rust: "devicon-rust-plain",
  SQL: "devicon-mysql-plain",
  "Next.js": "devicon-nextjs-plain",
  React: "devicon-react-original",
  "React Native": "devicon-react-original",
  "Node.js": "devicon-nodejs-plain",
  Express: "devicon-express-original",
  Prisma: "devicon-prisma-original",
  PostgreSQL: "devicon-postgresql-plain",
  MongoDB: "devicon-mongodb-plain",
  Docker: "devicon-docker-plain",
  Tauri: "devicon-tauri-plain",
  Redis: "devicon-redis-plain",
  AWS: "devicon-aws-plain",
  Linux: "devicon-linux-plain",
  "Framer Motion": "devicon-framer-motion-plain",
  "Tailwind CSS": "devicon-tailwindcss-plain",
  Figma: "devicon-figma-plain",
  Redux: "devicon-redux-original",
  Supabase: "devicon-supabase-plain",
  Git: "devicon-git-plain",
  GitHub: "devicon-github-original",
  Pandas: "devicon-pandas-plain",
  NumPy: "devicon-numpy-plain",
  Matplotlib: "devicon-matplotlib-plain",
};

interface SkillsCarouselProps {
  skills: string[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Split skills into two groups for two rows
  const midPoint = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, midPoint);
  const row2 = skills.slice(midPoint);

  // Duplication for seamless loops
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <div
      ref={containerRef}
      className="relative py-12 select-none overflow-hidden group/carousel"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse Spotlight */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.04), transparent 40%)`,
        }}
      />

      {/* 3D Perspective Container */}
      <div className="flex flex-col gap-8">
        {/* Row 1: Left to Right */}
        <div className="relative">
          <div
            className="flex gap-4 w-max px-4 cursor-pointer hover:[animation-play-state:paused]"
            style={{
              animation: "scroll-infinite 30s linear infinite",
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            {duplicatedRow1.map((skill, index) => (
              <SkillItem key={`${skill}-1-${index}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Opposite Direction) */}
        <div className="relative">
          <div
            className="flex gap-4 w-max px-4 cursor-pointer hover:[animation-play-state:paused]"
            style={{
              animation: "scroll-infinite-reverse 35s linear infinite",
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            {duplicatedRow2.map((skill, index) => (
              <SkillItem key={`${skill}-2-${index}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Side Gradients for fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent" />
    </div>
  );
}

function SkillItem({ skill }: { skill: string }) {
  return (
    <div
      className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-500 cursor-default relative overflow-hidden hover:scale-110 active:scale-95 hover:-translate-y-1"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 20px rgba(16, 185, 129, 0.05)",
      }}
    >
      {/* Inner Glow/Light Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/10 to-transparent" />

      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 15px rgba(16, 185, 129, 0.3), 0 0 25px rgba(16, 185, 129, 0.2)",
          border: "1px solid rgba(16, 185, 129, 0.5)",
        }}
      />

      {skillToIcon[skill] ? (
        <i
          className={`${skillToIcon[skill]} text-xl transition-all duration-500 group-hover:scale-125 group-hover:text-emerald-400 relative z-10`}
          style={{ color: "var(--text-secondary)" }}
        ></i>
      ) : (
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all duration-300 relative z-10" />
      )}
      <span
        className="brand-mono text-[11px] uppercase font-bold tracking-[0.15em] transition-colors duration-500 group-hover:text-[var(--text-primary)] relative z-10"
        style={{ color: "var(--text-secondary)" }}
      >
        {skill}
      </span>

      {/* Scanning Light Effect */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:animate-shimmer" />
    </div>
  );
}
