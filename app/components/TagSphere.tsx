"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TagSphereProps {
  tags: string[];
  radius?: number;
  className?: string;
}

/**
 * 3D word sphere (Fibonacci distribution) rendered with plain DOM +
 * transforms. Rotates slowly on its own and follows the pointer; no WebGL.
 */
export default function TagSphere({
  tags,
  radius = 150,
  className = "",
}: TagSphereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-tag]"),
    );
    const n = items.length;

    // Place points evenly on the sphere
    const points = items.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });

    let vx = 0.0008;
    let vy = 0.0016;
    let targetVx = vx;
    let targetVy = vy;
    let raf = 0;
    let active = true;

    const io = new IntersectionObserver(([e]) => {
      active = e.isIntersecting;
    });
    io.observe(root);

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      targetVy = dx * 0.012;
      targetVx = -dy * 0.012;
    };
    const onLeave = () => {
      targetVx = 0.0008;
      targetVy = 0.0016;
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    const render = () => {
      for (let i = 0; i < n; i++) {
        const p = points[i];
        const depth = (p.z + radius) / (2 * radius); // 0 (back) → 1 (front)
        const scale = 0.6 + depth * 0.6;
        items[i].style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
        items[i].style.opacity = String(0.25 + depth * 0.75);
        items[i].style.zIndex = String(Math.round(depth * 100));
      }
    };

    const rotate = (ax: number, ay: number) => {
      const cx = Math.cos(ax),
        sx = Math.sin(ax);
      const cy = Math.cos(ay),
        sy = Math.sin(ay);
      for (const p of points) {
        // Rotate around X
        const y1 = p.y * cx - p.z * sx;
        const z1 = p.y * sx + p.z * cx;
        // Rotate around Y
        const x2 = p.x * cy + z1 * sy;
        const z2 = -p.x * sy + z1 * cy;
        p.x = x2;
        p.y = y1;
        p.z = z2;
      }
    };

    const loop = () => {
      if (active && !reduce) {
        vx += (targetVx - vx) * 0.05;
        vy += (targetVy - vy) * 0.05;
        rotate(vx, vy);
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    render();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [radius, tags, reduce]);

  return (
    <div
      ref={ref}
      className={`relative select-none ${className}`}
      style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
      role="img"
      aria-label={`Technology cloud: ${tags.join(", ")}`}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          data-tag
          aria-hidden
          className="absolute left-1/2 top-1/2 -ml-[40px] -mt-[10px] w-[80px] text-center brand-mono text-[11px] font-bold uppercase tracking-wider whitespace-nowrap will-change-transform"
          style={{ color: "var(--text-primary)" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
