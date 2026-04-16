import { describe, it, expect } from "vitest";
import { cn, formatDate, readingTime, slugify } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names", () => {
      expect(cn("a", "b")).toBe("a b");
    });
    it("handles conditional classes", () => {
      expect(cn("a", false && "b", "c")).toBe("a c");
    });
    it("handles undefined and null", () => {
      expect(cn("a", undefined, null, "b")).toBe("a b");
    });
  });

  describe("formatDate", () => {
    it("formats a date string correctly", () => {
      expect(formatDate("2025-01-01")).toBe("January 1, 2025");
    });
  });

  describe("readingTime", () => {
    it("calculates average reading time", () => {
      const text = "word ".repeat(400);
      expect(readingTime(text)).toBe(2);
    });
  });

  describe("slugify", () => {
    it("converts text to a slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("Next.js 15 Is Awesome!")).toBe("nextjs-15-is-awesome");
    });
  });
});
