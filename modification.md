# Portfolio Modification Roadmap & Professional Requirements

This document outlines the necessary enhancements to transition this portfolio from a high-quality project to a professional, industry-standard engineering repository. These requirements focus on robustness, developer experience, and production readiness.

## 1. Developer Experience (DX) & Tooling

_Goal: Ensure code consistency and prevent regressions before they reach the repository._

- [x] **Git Hooks (Husky + lint-staged):**
  - Install Husky and configure a `pre-commit` hook to run `npm run lint` and `npm run format`.
  - Use `lint-staged` to only run checks on modified files to keep commit times fast.
- [x] **Strict Linting Configuration:**
  - Enhance `eslint.config.mjs` with plugins for accessibility (`eslint-plugin-jsx-a11y`) and import sorting (`eslint-plugin-import`).
  - Enable `@typescript-eslint/no-explicit-any` as an error instead of a warning.
- [x] **Environment Variable Validation:**
  - Use `zod` or `t3-env` to validate environment variables at build time and in the edge runtime. <!-- id: zod -->

## 2. Stability & Testing

_Goal: Move beyond "manual testing" to automated verification._

- [x] **Unit & Integration Testing (Vitest):**
  - Setup Vitest for testing utility functions (e.g., in `lib/utils.ts`) and core components.
  - Test the `Terminal` and `AnimatedCounter` logic for edge cases.
- [x] **End-to-End (E2E) Testing (Playwright):**
  - Implement Playwright tests for critical paths:
    - Navigation between pages.
    - Mobile menu functionality.
    - Contact form submission (mocked API).
- [x] **CI Pipeline (GitHub Actions):**
  - Create a `.github/workflows/ci.yml` to run linting and tests on every Pull Request. <!-- id: ci -->

## 3. Architecture & Data Management

_Goal: Improve content maintainability and type safety._

- [ ] **Content-Driven Architecture (MDX / Velite / Contentlayer):**
  - Replace static JSON files (`data/*.ts`) with a structured content layer using MDX or [Velite](https://velite.js.org/).
  - This allows for rich text in blog posts and projects without hacking JSON strings.
- [x] **Type-Safe Navigation:**
  - Implement a typed helper for `Link` components or use Next.js `typedRoutes` (experimental) to prevent broken links.
- [x] **Image Optimization Pipeline:**
  - Transition all project "abstract placeholders" to real optimized images using `next/image`.
  - Implement a blurring placeholder strategy for better LCP (Largest Contentful Paint). <!-- id: image -->

## 4. Performance & SEO

_Goal: Maximize discoverability and speed._

- [x] **Dynamic Sitemap & Robots.txt:**
  - Implement `app/sitemap.ts` and `app/robots.ts` to generate these files dynamically based on blog posts and project slugs.
- [ ] **OG Image Generation (`@vercel/og`):**
  - Setup a dynamic OG image generator that pulls the project title and category onto a branded card for social sharing.
- [x] **Analytics & Monitoring:**
  - Integrate Vercel Analytics or a privacy-focused alternative (e.g., Plausible/Umami) to track engagement without bloated scripts.
- [ ] **Core Web Vitals Audit:**
  - Fix any Layout Shifts (CLS) caused by Framer Motion animations during initial hydration. <!-- id: perf -->

## 5. Accessibility (A11y)

_Goal: Ensure the portfolio is usable by everyone._

- [ ] **WCAG 2.1 Compliance:**
  - Audit color contrast ratios, especially in "muted" or "tertiary" text classes.
- [x] **Keyboard Navigation:**
  - Ensure the `CommandPalette` and `Navbar` are fully navigable via keyboard (Tab and Arrow keys).
  - Add a "Skip to Content" link for screen readers.
- [ ] **Focus Management:**
  - Use `FocusTrap` or similar for modals and the command palette to prevent focus from escaping to the background. <!-- id: a11y -->

## 6. Design & Polish

_Goal: The "Experience Developer" feel._

- [x] **Micro-interactions:**
  - Add subtle haptic-like feedback or sound effects (optional/toggleable) for terminal interactions.
- [x] **Loading & Error States:**
  - Implement a custom `loading.tsx` for each route to provide a seamless transition during data fetching.
  - Create a branded `not-found.tsx` (404 page) that reflects the "terminal" aesthetic.
- [x] **Theme Persistence:**
  - Ensure the theme transition is completely flicker-free using a blocking script in `layout.tsx` (if not already fully handled by `ThemeProvider`). <!-- id: polish -->
