"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon, GitHubIcon } from "./Icons";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  // Scroll-based transformations for the floating pill
  const borderRadius = useTransform(scrollY, [0, 80], [24, 9999]);
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    [
      theme === "dark" ? "rgba(10, 10, 10, 0.4)" : "rgba(255, 255, 255, 0.4)",
      theme === "dark" ? "rgba(10, 10, 10, 0.85)" : "rgba(255, 255, 255, 0.85)",
    ],
  );
  const paddingY = useTransform(scrollY, [0, 80], ["12px", "8px"]);
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0 4px 12px rgba(0, 0, 0, 0)", "0 20px 48px rgba(0, 0, 0, 0.2)"],
  );

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-6">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto relative"
          style={{
            borderRadius,
            backgroundColor,
            boxShadow: shadow,
          }}
        >
          {/* Glass Backdrop */}
          <div className="absolute inset-0 rounded-[inherit] backdrop-blur-xl pointer-events-none" />

          {/* Hover highlight border */}
          <div
            className="absolute inset-0 rounded-[inherit] border pointer-events-none transition-colors duration-500"
            style={{ borderColor: "var(--glass-border)" }}
          />

          <motion.nav
            className="relative flex items-center gap-1 md:gap-2 px-2 md:px-3"
            style={{ paddingTop: paddingY, paddingBottom: paddingY }}
          >
            {/* Logo / Brand */}
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="relative group flex items-center gap-2 pl-4 pr-3 py-2 mr-2"
            >
              <span
                className="brand-mono text-[11px] font-bold tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                ~/arpitsarang
              </span>
              <motion.span
                layoutId="nav-pill-active"
                className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"
                style={{ background: "var(--surface-3)" }}
              />
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
                      onClick={() => setIsMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-4 py-2 text-[12px] font-semibold tracking-wide transition-colors duration-300 rounded-full ${
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
            <div className="flex items-center gap-1.5 pr-2 pl-1">
              {/* Cmd+K palette */}
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-command-palette"))
                }
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-[var(--surface-2)] cursor-pointer"
                style={{ color: "var(--text-tertiary)" }}
                aria-label="Command palette"
              >
                <span className="font-code text-[10px] font-bold">⌘K</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[var(--surface-2)] cursor-pointer ring-inset active:scale-95"
                style={{ color: "var(--text-primary)" }}
                aria-label="Toggle theme"
              >
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <SunIcon size={16} />
                  ) : (
                    <MoonIcon size={16} />
                  )}
                </motion.span>
              </button>

              {/* GitHub Link (Premium touch) */}
              <a
                href="https://github.com/CodeMaverick-143"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-[var(--surface-2)] cursor-pointer"
                style={{ color: "var(--text-primary)" }}
                aria-label="GitHub Profile"
              >
                <GitHubIcon size={16} />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:bg-[var(--surface-2)] cursor-pointer"
                aria-label="Toggle menu"
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
      </div>

      {/* Mobile Menu — Floating matching style */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Floating Menu Pill */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 100, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.9 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-6 right-6 z-50 lg:hidden flex flex-col gap-1 p-2 rounded-3xl glass shadow-2xl"
              style={{
                top: 0,
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-300 ${
                      pathname === link.href
                        ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] active:scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
                      {pathname === link.href && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}

              <div className="h-px bg-[var(--border)] my-1 mx-4 opacity-50" />

              <a
                href="https://github.com/CodeMaverick-143"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 text-sm font-medium text-[var(--text-secondary)] rounded-2xl hover:bg-[var(--surface-1)]"
              >
                <span>GitHub Profile</span>
                <GitHubIcon size={16} />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
