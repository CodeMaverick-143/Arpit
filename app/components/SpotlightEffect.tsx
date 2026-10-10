"use client";

import { useEffect } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";

/**
 * One delegated pointermove listener that feeds `--mx`/`--my` CSS variables
 * to any element carrying `data-spotlight`. The radial highlight itself is
 * pure CSS (see globals.css), so this never touches React state.
 */
export default function SpotlightEffect() {
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const e = lastEvent;
      if (!e) return;
      const target = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-spotlight]",
      );
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isTouch]);

  return null;
}
