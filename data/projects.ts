export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  role: string;
  category: (
    | "Full Stack"
    | "Frontend"
    | "Backend"
    | "Mobile"
    | "Systems"
    | "AI"
    | "DevTools"
  )[];
  github: string;
  live?: string;
  featured: boolean;
  year: string;
  image?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    process: string;
    architecture: string;
    outcome: string;
    codeSnippet?: string;
    codeLanguage?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "recoil",
    title: "Recoil",
    tagline:
      "Modern, tactical-themed system utility built with Tauri v2 and React",
    description:
      "Recoil allows you to instantly identify and terminate processes occupying specific network ports, featuring a high-performance Rust core.",
    tech: ["Tauri", "Reactjs", "Rust", "TypeScript"],
    role: "Solo Developer",
    category: ["Systems", "DevTools"],
    github: "https://github.com/CodeMaverick-143/Recoil",
    live: "https://recoil.xplnhub.tech",
    featured: true,
    year: "2025",
    caseStudy: {
      overview:
        "Recoil is a cross-platform system utility that enables developers to quickly identify and kill processes locking specific ports.",
      problem:
        'Developers often face "port already in use" errors and have to manually find and kill PIDs using terminal commands which is slow and repetitive.',
      solution:
        'Built a native desktop app that monitors live TCP ports and provides a one-click "Sniper Button" to terminate processes by PID instantly.',
      process:
        "Implemented live TCP port monitoring, designed a smart search filtering system, and integrated real-time CPU/memory telemetry via system-level APIs.",
      architecture:
        "Tauri runtime with a high-performance Rust core and a developer-focused React UI designed for speed and clarity.",
      outcome:
        "A lightweight, cross-platform core optimized for macOS that delivers real-time system insights with a distraction-free dark mode UI.",
      codeSnippet: `// Rust-based TCP port monitoring logic\npub fn get_active_listeners() -> Vec<Listener> {\n    // System-level networking calls here\n    // optimized for high-performance scanning\n}`,
      codeLanguage: "rust",
    },
  },
  {
    slug: "maverick-cli",
    title: "Maverick Cli",
    tagline: "Intelligent AI-powered CLI tool with full-stack sync",
    description:
      "An intelligent CLI tool featuring a full-stack architecture with a Next.js frontend and an Express/Prisma backend for modern developer workflows.",
    tech: ["NextJs", "SQL", "Express", "AI"],
    role: "Creator",
    category: ["DevTools", "Full Stack", "AI"],
    github: "https://github.com/CodeMaverick-143/Maverick-Cli",
    live: "https://maverick-cli.vercel.app",
    featured: true,
    year: "2025",
    caseStudy: {
      overview:
        "Maverick-cli bridges the gap between CLI efficiency and web-based management for developer workflows.",
      problem:
        "CLI tools often lack persistent visual management, while web tools can be slow for terminal-heavy workflows.",
      solution:
        "Built an AI-powered CLI tool with a Next.js frontend and Express backend. Uses Prisma for database management and better-auth for secure session handling.",
      process:
        "Designed a system for fast, command-line first workflows with real-time sync to a visual dashboard.",
      architecture:
        "Express backend acting as the API layer, Prisma ORM for structured data, and a Next.js dashboard for visual oversight.",
      outcome:
        "A developer-first tool that provides both a powerful CLI experience and a secure, aesthetic web interface.",
    },
  },
  {
    slug: "skillfest",
    title: "SkillFest",
    tagline: "Premium high-octane developer event and leaderboard platform",
    description:
      "Automates pull request tracking, validates developer skills with real-world code analysis, and gamifies the contribution experience through a live leaderboard.",
    tech: ["Reactjs", "Go", "Astro", "Cloudflare"],
    role: "Lead Developer",
    category: ["Full Stack"],
    github: "https://github.com/CodeMaverick-143/skillfest-platform",
    live: "https://skillfest.nstsdc.org",
    featured: true,
    year: "2026",
    caseStudy: {
      overview:
        "SkillFest is a premium, high-octane developer event platform designed for open-source communities.",
      problem:
        "Hackathon organizers struggle with disjointed tools for registration, team formation, and voting.",
      solution:
        "A unified platform built in Go and React, featuring a secure admin portal and dynamic event states.",
      process:
        "Built with a heavy focus on edge performance using Cloudflare and secure role-based access control.",
      architecture:
        "Go REST API backend with secure GitHub OAuth and PostgreSQL storage.",
      outcome:
        "A stable production platform with zero runtime crashes after defensive programming refactor.",
    },
  },
  {
    slug: "overclock",
    title: "OverClock",
    tagline: "Performance-driven project management system for hackathons",
    description:
      "Facilitates a competitive yet collaborative environment where teams select problem statements on a first-come-first-serve (FCFS) basis and compete on a multi-tier leaderboard.",
    tech: ["Reactjs", "SQL", "Mongo", "Go"],
    role: "Full Stack Developer",
    category: ["Full Stack", "Backend"],
    github: "https://github.com/CodeMaverick-143/OverClock",
    live: "",
    featured: true,
    year: "2026",
    caseStudy: {
      overview:
        "OverClock is a high-performance project management and evaluation system designed for hackathons, classrooms, and corporate training.",
      problem:
        "Choosing between SQL and NoSQL often forces trade-offs. Using both requires clean abstraction.",
      solution:
        "Implemented a Repository pattern in Go that routes queries to either PostgreSQL or MongoDB depending on data characteristics.",
      process:
        "Designed a unified API layer in Go with Chi router and custom middle-tier database drivers.",
      architecture:
        "Clean architecture with separate repository layers for relational and non-relational storage.",
      outcome:
        "A scalable full-stack project serving a React frontend with sub-100ms API response times.",
    },
  },
  {
    slug: "exam-analytics-system",
    title: "Exam_Analytics_System",
    tagline: "AI-powered question difficulty analysis with Agentic AI",
    description:
      "Predicts and analyzes the difficulty of assessment items using a hybrid approach of Traditional Machine Learning and Agentic AI (LangGraph/LangChain).",
    tech: ["Python", "Streamlit", "LangGraph", "LangChain"],
    role: "AI Developer",
    category: ["AI"],
    github: "https://github.com/praggCode/Exam-Analytics-System",
    live: "https://team-prag-aiml-project.streamlit.app",
    featured: true,
    year: "2025",
    caseStudy: {
      overview:
        "Exam Analytics Pro is a high-performance system designed to predict and analyze the difficulty of assessment items.",
      problem:
        'Standard difficulty metrics lack "the why"—pedagogical explanations for why a question is hard.',
      solution:
        "A stateful LangGraph workflow that takes ML predictions and generates human-readable reasoning from an LLM.",
      process:
        "Trained scikit-learn models for base classification, then wrapped them in a LangChain agent pipeline.",
      architecture:
        "Python-based pipeline with a Streamlit interface and agentic reasoning at the core.",
      outcome:
        "An explainable AI system used for refining educational assessment tools.",
    },
  },
  {
    slug: "quick-snatch-platform",
    title: "Quick_Snatch_Platform",
    tagline: "Secure, scalable, terminal-based CTF event platform",
    description:
      "Teams register, solve challenges, unlock levels, and compete on a live leaderboard. Built with high-performance Go networking.",
    tech: ["Reactjs", "SQL", "Go"],
    role: "Full Stack Developer",
    category: ["Full Stack", "Backend", "Systems"],
    github: "https://github.com/CodeMaverick-143/Quick_Snatch_Platform",
    live: "https://quick-snatch-platform.vercel.app",
    featured: false,
    year: "2026",
    caseStudy: {
      overview:
        "A secure, scalable, terminal-based CTF event platform built with Go.",
      problem:
        "Typical real-time web applications struggle with latency when handling many simultaneous events.",
      solution:
        "Leveraged Go's standard library networking and goroutine pools to minimize garbage collection pauses and context switching.",
      process:
        "Designed a custom real-time protocol and optimized it for high-concurrency competitive play.",
      architecture:
        "Go backend with a minimalist React frontend for low latency.",
      outcome:
        "Functional competitive platform capable of handling intense real-time traffic spikes.",
    },
  },
  {
    slug: "tekron-apk",
    title: "Tekron-Apk",
    tagline: "Event management and chaos-free check-in system",
    description:
      "Eliminates college fest chaos by streamlining participant entry, delivering real-time updates, and providing precise event location assignments.",
    tech: ["React Native", "Express", "Mongo"],
    role: "Mobile Developer",
    category: ["Mobile", "Full Stack"],
    github: "https://github.com/nst-sdc/tekron-2.0-APK",
    live: "https://webapp.tekronfest.com",
    featured: false,
    year: "2026",
    caseStudy: {
      overview:
        "Tekron App is an event management and check-in system designed to eliminate the chaos typically seen during college fests.",
      problem:
        "Building feature-rich mobile apps often leads to performance bottlenecks on lower-end devices.",
      solution:
        "Optimized the bridge between React Native and the Express API, using MongoDB for performant document lookups.",
      process:
        "Iterated on UI performance and integrated custom animation profiles for better UX.",
      architecture:
        "MERN stack adapted for mobile, with React Native as the interface layer.",
      outcome:
        "A functional, cross-platform mobile application with native performance.",
    },
  },
  {
    slug: "fr",
    title: "FR",
    tagline: "High-performance cross-platform developer utility suite",
    description:
      'Combines a lightning-fast Rust CLI with a beautiful "Terminal-First" GUI for managing projects and resources.',
    tech: ["Reactjs", "Rust", "Tauri"],
    role: "Solo Developer",
    category: ["Systems", "DevTools"],
    github: "https://github.com/CodeMaverick-143/FR",
    live: "",
    featured: false,
    year: "2024",
    caseStudy: {
      overview:
        "FR is a high-performance, cross-platform developer utility suite built with Rust and Tauri.",
      problem:
        "System tools often have clunky GUIs that trade performance for development speed.",
      solution:
        "Used Tauri to separate system-level Rust logic from the lightweight React interface.",
      process:
        "Focused on memory safety and efficient IPC between the frontend and the Rust backend.",
      architecture:
        "Tauri runtime with custom Rust commands and a Vite-powered React UI.",
      outcome:
        "Shipped as a performant desktop binary with a footprint under 50MB.",
    },
  },
  {
    slug: "codenarrator",
    title: "CodeNarrator",
    tagline:
      "Bridging the gap between complex code and developer understanding",
    description:
      "Helps understanding any codebase faster by generating human-readable narratives and documentation summaries.",
    tech: ["Javascript", "AST Parsing", "Node.js"],
    role: "Creator",
    category: ["DevTools"],
    github: "https://github.com/XplnHUB/CodeNarrator",
    live: "https://www.npmjs.com/package/@codemaverick-143/codenarrator",
    featured: false,
    year: "2024",
    caseStudy: {
      overview:
        "CodeNarrator aims to bridge the gap between complex code and developer understanding.",
      problem:
        "Technical documentation often lags behind code changes, making it difficult to maintain.",
      solution:
        "Built an AST-based parser that maps code patterns to readable descriptive text.",
      process:
        "Developed custom traversal logic for complex JavaScript architectures to ensure accurate narration.",
      architecture:
        "Node.js utility using Babel core for source-to-source analysis.",
      outcome:
        'A developer tool that speeds up onboarding by generating "first-read" guides for new repositories.',
    },
  },
  {
    slug: "slate-apk",
    title: "Slate-APK",
    tagline: "Modern, gesture-driven task management application",
    description:
      "Minimalist productivity app designed for mobile speed, featuring gesture-driven task management and Mongo sync.",
    tech: ["React Native", "Mongo", "Expo"],
    role: "Mobile Developer",
    category: ["Mobile"],
    github: "https://github.com/CodeMaverick-143/Slate-Apk",
    live: "",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "A modern, gesture-driven task management application built with React Native and Expo.",
      problem:
        "Note apps often have high latency between typing and remote persistence.",
      solution:
        "Implemented an offline-first strategy using local storage with async sync workers.",
      process:
        "Designed a minimal typography-first UI for focus and readability on small screens.",
      architecture:
        "React Native with localized persistence and background background sync to Atlas.",
      outcome:
        "Highly responsive mobile productivity tool with reliable data integrity.",
    },
  },
  {
    slug: "newgate",
    title: "Newgate",
    tagline: "Modern Node.js backend framework for multi-format parsing",
    description:
      "Combines simplicity of Express-style routing with automatic parsing for JSON, CSV, XML, YAML, form-data, and binary data.",
    tech: ["Javascript", "NPM", "Backend"],
    role: "Creator",
    category: ["DevTools", "Backend"],
    github: "https://github.com/CodeMaverick-143/Newgate",
    live: "https://newgate.xplnhub.tech",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "Newgate is a modern Node.js backend framework designed for developers who want to handle multiple data formats effortlessly.",
      problem:
        "Developers often include overweight libraries like Lodash for just one or two functions.",
      solution:
        "A tree-shakeable collection of modular utilities for date, string, and array manipulation.",
      process:
        "Published via NPM after rigorous unit testing of core utility modules.",
      architecture: "Pure JavaScript library with zero external dependencies.",
      outcome:
        "Successful NPM publication with a multi-format parsing capability.",
    },
  },
  {
    slug: "sketchy",
    title: "Sketchy",
    tagline: "Collaborative whiteboard with real-time chat",
    description:
      "A shared digital canvas for remote collaboration, built with specialized sync logic and integrated chat features.",
    tech: ["NextJs", "Express", "SQL"],
    role: "Full Stack Developer",
    category: ["Full Stack", "Frontend"],
    github: "https://github.com/CodeMaverick-143/Sketchy",
    live: "https://github.com/CodeMaverick-143/Sketchy/blob/main/scene1.png",
    featured: false,
    year: "2025",
    caseStudy: {
      overview: "A collaborative whiteboard with chat feature.",
      problem:
        "Handling high-frequency drawing updates over WebSockets can saturate network traffic.",
      solution:
        "Implemented delta-compression for canvas strokes and optimized the Express gateway.",
      process:
        "Built and tested for multi-user scenarios with up to 10 simultaneous contributors.",
      architecture:
        "Next.js frontend with an Express API and SQL-based persistence for drawings.",
      outcome:
        "A smooth collaborative experience with persistent canvas states.",
    },
  },
  {
    slug: "instagram-analytics",
    title: "Instagram_Analytics",
    tagline: "ML-powered analysis of 30,000+ Instagram posts",
    description:
      "Studies posting behavior and builds predictive models for engagement using detailed metrics like reach, impressions, and content type.",
    tech: ["Python", "ML", "Data Analysis"],
    role: "Data Engineer",
    category: ["AI", "DevTools"],
    github: "https://github.com/CodeMaverick-143/Instagram_Analytics",
    live: "https://github.com/CodeMaverick-143/Instagram_Analytics/blob/main/Instagram_Analytics.ipynb",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "This project analyzes a dataset of 30,000 Instagram posts collected over the last 12 months.",
      problem:
        "Manual tracking of engagement growth is time-consuming and prone to human error.",
      solution:
        "Automated script that scrapes and aggregates data points into structured CSV/JSON formats.",
      process:
        "Refined the data cleaning layer in Python to handle inconsistent social media metadata.",
      architecture:
        "Pure Python scripts with custom data cleaning and aggregation modules.",
      outcome:
        "A fast utility for generating engagement reports from raw social data.",
    },
  },
  {
    slug: "git-stat-apk",
    title: "Git_Stat_APK",
    tagline: "Detailed GitHub analytics and user insights on mobile",
    description:
      "Enables users to explore GitHub profiles, repository statistics, contribution metrics, and PR data on a native cross-platform app.",
    tech: ["React Native", "Javascript", "Expo"],
    role: "Mobile Developer",
    category: ["Mobile", "DevTools"],
    github: "https://github.com/CodeMaverick-143/Git_Stat_APK",
    live: "https://expo.dev/accounts/arpit_code_titan/projects/github-stats",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "A comprehensive cross-platform mobile application built with React Native and Expo that provides detailed GitHub analytics and user insights.",
      problem:
        "Checking detailed contribution graphs is difficult on the mobile web interface.",
      solution:
        "Customized data visualization components in React Native to provide readable project stats.",
      process:
        "Focused on optimizing API calls to stay within GitHub's performance limits.",
      architecture: "React Native app consuming the GitHub REST API.",
      outcome:
        "A handy utility for developers to track their metrics on the go.",
    },
  },
  {
    slug: "snakeskin",
    title: "Snakeskin",
    tagline: "Modern, lightweight frontend framework/library",
    description:
      "Designed to make building component-based apps fast, flexible, and enjoyable. Integrates with Tailwind and provides a project CLI.",
    tech: ["Python", "Frontend"],
    role: "Creator",
    category: ["Frontend", "DevTools"],
    github: "https://github.com/CodeMaverick-143/Snakeskin",
    live: "https://snakeskin.xplnhub.tech",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "Snakeskin is a modern, lightweight frontend framework/library designed to make building component-based web applications fast.",
      problem:
        "Setting up consistent logging, config, and folder structures in Python is repetitive.",
      solution:
        "A centralized library of boilerplate-crushing modules for rapid prototype development.",
      process:
        "Built during a series of high-speed AI experiments to keep development velocity high.",
      architecture:
        "Modular Python library with an focus on simplicity and ease of use.",
      outcome:
        "A internal tool used across multiple AI and data science scripts to maintain consistency.",
    },
  },
  {
    slug: "insight",
    title: "Insight",
    tagline: "AI-powered codebase analysis and report generator",
    description:
      "Python-based CLI tool that analyzes codebases, providing both static analysis and AI-powered explanations via Gemini API.",
    tech: ["Python", "AI", "CLI"],
    role: "Developer",
    category: ["AI", "DevTools"],
    github: "https://github.com/XplnHUB/Insight-Py",
    live: "https://pypi.org/project/insight-cli-sarang",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "Insight is a Python-based CLI tool that analyzes codebases and generates detailed reports.",
      problem:
        "Data scientists often spend too much time on basic Matplotlib boilerplate.",
      solution:
        "A simple CLI tool that takes a CSV and yields a set of relevant visualizations instantly.",
      process:
        'Refined the "auto-chart" logic to choose the best visualization type based on data columns.',
      architecture:
        "Python application utilizing Pandas and visualization libraries.",
      outcome: "A useful research utility for fast initial data exploration.",
    },
  },
  {
    slug: "les-go",
    title: "Les-Go",
    tagline: "Secure terminal-based messaging with E2E encryption",
    description:
      "Go-based messaging system providing authenticated communication, real-time delivery, and encrypted message persistence.",
    tech: ["Go", "Encryption", "Networking"],
    role: "Developer",
    category: ["Systems", "Backend"],
    github: "https://github.com/XplnHUB/Les-Go",
    live: "",
    featured: false,
    year: "2026",
    caseStudy: {
      overview:
        "Les’Go is a secure, terminal-based messaging system built in Go.",
      problem:
        "Learning systems programming in Go requires hands-on experiments with goroutines and memory.",
      solution:
        "A playground for building low-level utilities with a focus on performant, idiomatic code.",
      process:
        "Iterative development of core systems tasks like file walking and process management.",
      architecture:
        "Pure Go implementation without heavy external dependencies.",
      outcome:
        "A foundational codebase for later production-grade Go services.",
    },
  },
  {
    slug: "lockedin",
    title: "Lockedin",
    tagline: "Modular Bash-based productivity and focus tool",
    description:
      "A robust framework for managing tasks and projects through a CLI using local JSON data persistence and a distraction-free environment.",
    tech: ["Shell", "Bash"],
    role: "Creator",
    category: ["DevTools", "Systems"],
    github: "https://github.com/XplnHUB/lockedin",
    live: "https://lockedin.xplnhub.tech",
    featured: false,
    year: "2026",
    caseStudy: {
      overview:
        "LockedIn is a modular, Bash-based productivity management tool designed for terminal users.",
      problem: "Context switching to web-based timers breaks developer flow.",
      solution:
        "A Shell script that provides a TUI-style focus timer with sessions and reminders.",
      process:
        "Optimized for Unix-like systems and deployed as a web-accessible terminal tool.",
      architecture:
        "Pure Shell scripts with simple state management via temporary files.",
      outcome:
        "A handy tool for developers wanting to maintain deep focus from within their shell.",
    },
  },
  {
    slug: "annoymeet",
    title: "Annoymeet",
    tagline: "Anonymous real-time question asking platform",
    description:
      "Web-based application facilitating anonymous interactions between students and teachers with real-time room-based updates.",
    tech: ["Reactjs", "Express", "SQL"],
    role: "Team Lead",
    category: ["Full Stack"],
    github: "https://github.com/nst-sdc/Anonymous_Question_Asking-Platform",
    live: "https://annoymeet.vercel.app",
    featured: false,
    year: "2025",
    caseStudy: {
      overview:
        "The Anonymous Question Asking Platform is a real-time, web-based application.",
      problem:
        "Maintaining anonymity while preventing abuse in high-concurrency real-time environments.",
      solution:
        "Built a robust moderation layer over Socket.IO with Supabase for persistent room states.",
      process:
        "Led a small team during an internship to ship the initial MVP in under three weeks.",
      architecture:
        "React frontend with a custom Socket server orchestrated by Express.",
      outcome:
        "A successful internal platform implementation for school-wide Q&A sessions.",
    },
  },
  {
    slug: "internship-portal",
    title: "Intership Portal",
    tagline: "Intelligence portal for institutional placements",
    description:
      "Helps students prepare for internships using real interview data, company assignments, and structured modules with stability-focused architecture.",
    tech: ["Reactjs", "Express", "Mongo", "Astro"],
    role: "Full Stack Developer",
    category: ["Full Stack"],
    github: "https://github.com/CodeMaverick-143/internship",
    live: "https://kaizen.nstsdc.org",
    featured: false,
    year: "2026",
    caseStudy: {
      overview:
        "The Internship Intelligence Portal is a web platform designed to help students prepare for internships and placements.",
      problem:
        "Legacy systems were prone to crashes during peak registration periods due to unhandled API edge cases.",
      solution:
        "Implemented comprehensive defensive programming across the stack and optimized DB indices.",
      process:
        "Conducted a deep-dive security and stability audit, followed by refactoring the core API logic.",
      architecture:
        "Modern web stack (MERN) with specialized service layers for data validation.",
      outcome:
        "A production-level stability record with zero reported runtime errors.",
    },
  },
];

export const categories = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "Systems",
  "AI",
  "DevTools",
] as const;
export type Category = (typeof categories)[number];
