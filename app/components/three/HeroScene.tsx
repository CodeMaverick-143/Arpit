"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

/** Pointer position normalised to -1..1, shared via a ref so no re-renders. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Wireframe({
  pointer,
  dark,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  dark: boolean;
}) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const p = pointer.current;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.12;
      outer.current.rotation.x = THREE.MathUtils.lerp(
        outer.current.rotation.x,
        p.y * 0.35,
        0.04,
      );
      outer.current.rotation.z = THREE.MathUtils.lerp(
        outer.current.rotation.z,
        p.x * 0.25,
        0.04,
      );
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.2;
      inner.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color={dark ? "#fafafa" : "#0a0a0a"}
          wireframe
          transparent
          opacity={dark ? 0.22 : 0.16}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial
          color={dark ? "#a3a3a3" : "#525252"}
          wireframe
          transparent
          opacity={dark ? 0.3 : 0.2}
        />
      </mesh>
    </Float>
  );
}

/** Deterministic PRNG (mulberry32) — keeps render pure and the field stable across renders */
function seededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({
  count = 900,
  pointer,
  dark,
}: {
  count?: number;
  pointer: React.RefObject<{ x: number; y: number }>;
  dark: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = seededRandom(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical shell so the field reads as depth, not a flat sheet
      const r = 5 + rand() * 6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = pointer.current;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      p.y * 0.15,
      0.02,
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      -p.x * 0.1,
      0.02,
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={dark ? "#a3a3a3" : "#525252"}
        transparent
        opacity={dark ? 0.55 : 0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Camera drifts with the pointer for a subtle parallax. */
function CameraRig({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  useFrame(({ camera }) => {
    const p = pointer.current;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      p.x * 0.6,
      0.03,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      p.y * 0.4,
      0.03,
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Lightweight R3F scene: wireframe icosahedra + a particle shell.
 * Pauses its render loop when scrolled off-screen or the tab is hidden.
 */
export default function HeroScene() {
  const pointer = usePointer();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      {
        threshold: 0.05,
      },
    );
    io.observe(el);
    const onVis = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ pointerEvents: "none" }}
      >
        <CameraRig pointer={pointer} />
        <Wireframe pointer={pointer} dark={dark} />
        <Particles pointer={pointer} dark={dark} />
      </Canvas>
    </div>
  );
}
