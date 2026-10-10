"use client";

import { useMediaQuery } from "./useMediaQuery";

/** True on devices whose primary pointer can't hover (phones, tablets). */
export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}
