"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, socialLinks } from "@/data/navigation";
import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon, GitHubIcon } from "./Icons";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { ease, spring } from "@/lib/motion";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, isMobileOpen);

  // Scroll-based transformations for the floating pill (theme-independent:
  // colours come from CSS variables, only opacity/shadow are interpolated)
  const borderRadius = useTransform(scrollY, [0, 80], [24, 9999]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0.4, 0.85]);
  const paddingY = useTransform(scrollY, [0, 80], ["12px", "8px"]);
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0 4px 12px rgba(0, 0, 0, 0)", "0 20px 48px rgba(0, 0, 0, 0.2)"],
  );
  const backgroundColor = useTransform(
    bgOpacity,
    (o) => `color-mix(in srgb, var(--surface-0) ${o * 100}%, transparent)`,
  );

  // Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const delta = latest - prev;
    if (isMobileOpen) return;
    if (latest < 120) {
      setHidden(false);
    } else if (delta > 6) {
      setHidden(true);
    } else if (delta < -6) {
      setHidden(false);
    }
  });

  // Close mobile menu when the route changes (state-from-props pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  // Escape closes; lock body scroll while open
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: ease.out },
    }),
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4 md:p-6"
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.45, ease: ease.expo }}
      >
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: ease.expo }}
          className="pointer-events-auto relative"
          style={{ borderRadius, backgroundColor, boxShadow: shadow }}
        >
          {/* Glass Backdrop */}
          <div className="absolute inset-0 rounded-[inherit] backdrop-blur-xl pointer-events-none" />

          {/* Border */}
          <div
            className="absolute inset-0 rounded-[inherit] border pointer-events-none"
            style={{ borderColor: "var(--glass-border)" }}
          />

          <motion.nav
            aria-label="Primary"
            className="relative flex items-center gap-1 md:gap-2 px-2 md:px-3"
            style={{ paddingTop: paddingY, paddingBottom: paddingY }}
          >
            {/* Logo / Brand */}
            <Link
              href="/"
              className="relative group flex items-center gap-2 pl-4 pr-3 py-2 mr-1 min-h-11"
            >
              <span
                className="brand-mono text-[11px] font-bold tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                ~/arpitsarang
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative inline-flex items-center px-4 py-2 min-h-11 text-[12px] font-semibold tracking-wide transition-colors duration-300 rounded-full ${
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 z-[-1] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                          style={{
                            background: "var(--surface-1)",
                            border: "1px solid var(--border)",
                          }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Actions Divider */}
            <div
              className="hidden lg:block w-[1px] h-4 mx-2"
              style={{ background: "var(--border)" }}
            />

            {/* Right Actions */}
            <div className="flex items-center gap-1 pr-1 pl-1">
              {/* Cmd+K palette */}
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-command-palette"))
                }
                className="hidden sm:flex h-11 px-3 items-center justify-center gap-1.5 rounded-full transition-colors duration-300 hover:bg-[var(--surface-2)] cursor-pointer"
                style={{ color: "var(--text-tertiary)" }}
                aria-label="Open command palette (Cmd+K)"
                title="Command palette · ⌘K"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <span className="font-code text-[10px] font-bold">⌘K</span>
              </button>

              {/* Theme Toggle — circular reveal from the button */}
              <button
                onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[var(--surface-2)] cursor-pointer active:scale-95"
                style={{ color: "var(--text-primary)" }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title="Toggle theme · T"
              >
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={spring.snappy}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <SunIcon size={16} />
                  ) : (
                    <MoonIcon size={16} />
                  )}
                </motion.span>
              </button>

              {/* GitHub Link */}
              <a
                href="https://github.com/CodeMaverick-143"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[var(--surface-2)] cursor-pointer"
                style={{ color: "var(--text-primary)" }}
                aria-label="GitHub Profile"
              >
                <GitHubIcon size={16} />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 hover:bg-[var(--surface-2)] cursor-pointer"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  animate={
                    isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                  }
                  className="block w-4 h-[1.5px]"
                  style={{ background: "var(--text-primary)" }}
                />
                <motion.span
                  animate={
                    isMobileOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }
                  }
                  className="block w-4 h-[1.5px]"
                  style={{ background: "var(--text-primary)" }}
                />
                <motion.span
                  animate={
                    isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                  }
                  className="block w-4 h-[1.5px]"
                  style={{ background: "var(--text-primary)" }}
                />
              </button>
            </div>
          </motion.nav>
        </motion.header>
      </motion.div>

      {/* Mobile Menu — full-screen, staggered */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: ease.expo }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between px-8 pt-28 pb-10 glass"
            style={{ background: "var(--background)" }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: 0.15 + i * 0.06,
                      duration: 0.5,
                      ease: ease.expo,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center gap-4 py-3 min-h-14"
                    >
                      <span
                        className="brand-mono text-[10px] w-6"
                        style={{
                          color: active ? "var(--brand)" : "var(--text-muted)",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="heading-display text-4xl transition-transform duration-300 group-hover:translate-x-2"
                        style={{
                          color: active
                            ? "var(--text-primary)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-mono text-[11px] uppercase tracking-widest py-2 min-h-11 inline-flex items-center"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
