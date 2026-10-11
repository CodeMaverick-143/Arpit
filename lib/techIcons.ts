/**
 * Technology icon registry — the single source of truth for mapping a
 * technology name to a self-hosted SVG in /public/icons/tech.
 *
 * Two lookups are supported:
 *  - exact key (e.g. "nextjs") for data that declares an `icon` explicitly
 *  - fuzzy `resolveTechIcon("Node.js / Express")` for free-form labels
 *    (carousel, tech chips, case-study stacks)
 */

/** `dark` = logo is black ink; invert it on the dark theme so it stays visible */
export const TECH_ICONS = {
  react: { file: "react", label: "React" },
  nextjs: { file: "nextjs", label: "Next.js", dark: true },
  typescript: { file: "typescript", label: "TypeScript" },
  javascript: { file: "javascript", label: "JavaScript" },
  tailwindcss: { file: "tailwindcss", label: "Tailwind CSS" },
  figma: { file: "figma", label: "Figma" },
  nodejs: { file: "nodejs", label: "Node.js" },
  express: { file: "express", label: "Express", dark: true },
  go: { file: "go", label: "Go" },
  python: { file: "python", label: "Python" },
  django: { file: "django", label: "Django" },
  prisma: { file: "prisma", label: "Prisma" },
  sql: { file: "sql", label: "SQL", dark: true },
  mysql: { file: "mysql", label: "MySQL" },
  postgresql: { file: "postgresql", label: "PostgreSQL" },
  mongodb: { file: "mongodb", label: "MongoDB" },
  supabase: { file: "supabase", label: "Supabase" },
  redux: { file: "redux", label: "Redux" },
  docker: { file: "docker", label: "Docker" },
  rust: { file: "rust", label: "Rust", dark: true },
  tauri: { file: "tauri", label: "Tauri" },
  linux: { file: "linux", label: "Linux", dark: true },
  bash: { file: "bash", label: "Shell", dark: true },
  git: { file: "git", label: "Git" },
  github: { file: "github", label: "GitHub", dark: true },
  pytorch: { file: "pytorch", label: "PyTorch" },
  tensorflow: { file: "tensorflow", label: "TensorFlow" },
  scikitlearn: { file: "scikitlearn", label: "scikit-learn" },
  langchain: { file: "langchain", label: "LangChain" },
  llm: { file: "llm", label: "LLM" },
  pandas: { file: "pandas", label: "Pandas" },
  numpy: { file: "numpy", label: "NumPy" },
  matplotlib: { file: "matplotlib", label: "Matplotlib" },
  jupyter: { file: "jupyter", label: "Jupyter" },
  streamlit: { file: "streamlit", label: "Streamlit" },
  socketio: { file: "socketio", label: "Socket.IO" },
  cloudflare: { file: "cloudflare", label: "Cloudflare" },
  vercel: { file: "vercel", label: "Vercel", dark: true },
  astro: { file: "astro", label: "Astro" },
  mobile: { file: "mobile", label: "Mobile" },
} as const;

export type TechIconKey = keyof typeof TECH_ICONS;

/** Free-form label fragments → registry key. Checked in order; first match wins. */
const ALIASES: Array<[RegExp, TechIconKey]> = [
  [/react\s*native/i, "react"],
  [/\breact(js)?\b/i, "react"],
  [/next(\.?js)?/i, "nextjs"],
  [/typescript|\bts\b/i, "typescript"],
  [/javascript|\bjs\b/i, "javascript"],
  [/tailwind/i, "tailwindcss"],
  [/figma/i, "figma"],
  [/node(\.?js)?/i, "nodejs"],
  [/express/i, "express"],
  [/\bgo\b|golang/i, "go"],
  [/django/i, "django"],
  [/python/i, "python"],
  [/prisma/i, "prisma"],
  [/postgres/i, "postgresql"],
  [/mysql/i, "mysql"],
  [/\bsql\b/i, "sql"],
  [/mongo/i, "mongodb"],
  [/supabase/i, "supabase"],
  [/redux/i, "redux"],
  [/docker/i, "docker"],
  [/rust/i, "rust"],
  [/tauri/i, "tauri"],
  [/linux/i, "linux"],
  [/bash|shell|zsh/i, "bash"],
  [/github/i, "github"],
  [/\bgit\b/i, "git"],
  [/pytorch|fine-?tun|peft|qlora/i, "pytorch"],
  [/tensorflow/i, "tensorflow"],
  [/scikit|sklearn/i, "scikitlearn"],
  [/langchain|langgraph/i, "langchain"],
  [/\bllm\b|\bai\b|agent/i, "llm"],
  [/pandas/i, "pandas"],
  [/numpy/i, "numpy"],
  [/matplotlib/i, "matplotlib"],
  [/jupyter/i, "jupyter"],
  [/streamlit/i, "streamlit"],
  [/socket/i, "socketio"],
  [/cloudflare/i, "cloudflare"],
  [/vercel/i, "vercel"],
  [/astro/i, "astro"],
  [/mobile|android|ios\b/i, "mobile"],
];

export function isTechIconKey(key: string): key is TechIconKey {
  return key in TECH_ICONS;
}

/** Resolve any label ("Go (Golang)", "Node.js / Express") to a registry key. */
export function resolveTechIcon(label: string): TechIconKey | null {
  const normalized = label
    .trim()
    .toLowerCase()
    .replace(/[\s.\-_/]/g, "");
  if (isTechIconKey(normalized)) return normalized;
  for (const [pattern, key] of ALIASES) {
    if (pattern.test(label)) return key;
  }
  return null;
}

/** True when the logo is black ink and needs inverting on dark backgrounds */
export function techIconIsDark(key: TechIconKey): boolean {
  return (
    "dark" in TECH_ICONS[key] &&
    (TECH_ICONS[key] as { dark?: boolean }).dark === true
  );
}

export function techIconSrc(key: TechIconKey): string {
  return `/icons/tech/${TECH_ICONS[key].file}.svg`;
}
