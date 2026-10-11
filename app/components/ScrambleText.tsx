"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  /** ms per frame */
  speed?: number;
  /** Start when scrolled into view (default) or immediately */
  trigger?: "inView" | "mount";
}

/**
 * Terminal-style decode effect: characters resolve left-to-right from
 * random glyphs into the final text. Screen readers always get the
 * real string via aria-label.
 */
export default function ScrambleText({
  text,
  className = "",
  style,
  as: Tag = "span",
  speed = 28,
  trigger = "inView",
}: ScrambleTextProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("");
  const frame = useRef(0);
  const done = useRef(false);

  const shouldRun = trigger === "mount" || inView;
  const shown = reduce ? text : display;

  useEffect(() => {
    if (reduce || !shouldRun || done.current) return;
    done.current = true;

    const total = text.length;
    let iteration = 0;
    let last = 0;
    let raf = 0;

    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        const resolved = Math.floor(iteration);
        const out = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < resolved) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(out);
        iteration += Math.max(0.6, total / 22);
        if (resolved >= total) {
          setDisplay(text);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    frame.current = raf;
    return () => cancelAnimationFrame(raf);
  }, [shouldRun, text, speed, reduce]);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      style={style}
      aria-label={text}
    >
      <span aria-hidden>{shown || " "}</span>
    </Tag>
  );
}
