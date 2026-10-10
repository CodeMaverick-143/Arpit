"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// three.js only ever loads on capable desktop browsers, after hydration
const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

// WebGL support never changes during a session — detect once, read via store
let webglSupport: boolean | null = null;
function detectWebGL() {
  if (webglSupport === null) {
    try {
      const c = document.createElement("canvas");
      webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};

/**
 * Hero backdrop: a CSS mesh gradient (always) layered with the lazy 3D
 * scene (desktop, motion allowed, WebGL available). The gradient pauses its
 * animation when the hero scrolls out of view.
 */
export default function HeroBackground() {
  const isTouch = useIsTouch();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show3d = webgl && !isTouch && !reduce;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${visible ? "" : "mesh-paused"}`}
      aria-hidden
    >
      {/* Mesh gradient blobs */}
      <div
        className="mesh-blob"
        style={{
          width: "55vw",
          height: "55vw",
          top: "-20%",
          left: "-10%",
          background: "var(--mesh-1)",
        }}
      />
      <div
        className="mesh-blob"
        style={{
          width: "45vw",
          height: "45vw",
          top: "10%",
          right: "-15%",
          background: "var(--mesh-2)",
        }}
      />
      <div
        className="mesh-blob"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "-25%",
          left: "30%",
          background: "var(--mesh-3)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-[0.35]" />

      {/* Vignette so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--background) 100%)",
        }}
      />

      {show3d && <HeroScene />}
    </div>
  );
}
