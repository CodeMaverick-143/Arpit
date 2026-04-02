export interface Skill {
  name: string;
  colorVariant: 'emerald' | 'blue' | 'violet' | 'amber' | 'slate';
  proof: string; // e.g. "Production", "Built Projects", "Open Source"
  detail: string; // one-liner on what you used it for
}

export interface SkillCategory {
  name: string;
  iconName: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    iconName: 'layout',
    skills: [
      { name: 'React', colorVariant: 'emerald', proof: 'Built Projects', detail: 'Primary library for web and mobile (React Native) UI' },
      { name: 'Next.js', colorVariant: 'blue', proof: 'Open Source', detail: 'SSR/SSG apps and visual dashboards for CLI tools' },
      { name: 'TypeScript', colorVariant: 'blue', proof: 'Production', detail: 'Typed development across the MERN stack' },
      { name: 'Tailwind CSS', colorVariant: 'emerald', proof: 'Production', detail: 'Crafting responsive, utility-first interfaces' },
      { name: 'Figma', colorVariant: 'violet', proof: 'Design', detail: 'Prototyping and high-fidelity UI design' },
    ],
  },
  {
    name: 'Backend',
    iconName: 'server',
    skills: [
      { name: 'Node.js / Express', colorVariant: 'emerald', proof: 'Production', detail: 'Scalable REST APIs for Q-A and CLI platforms' },
      { name: 'Go (Golang)', colorVariant: 'blue', proof: 'Built Projects', detail: 'Systems backend with structured logging and YAML' },
      { name: 'Python / Django', colorVariant: 'violet', proof: 'Built Projects', detail: 'Scripting, backend logic, and AI integrations' },
      { name: 'Prisma ORM', colorVariant: 'blue', proof: 'Production', detail: 'Type-safe database management in TypeScript' },
      { name: 'SQL', colorVariant: 'blue', proof: 'Production', detail: 'Relational database architecture for student/mgmt systems' },
    ],
  },
  {
    name: 'Mobile',
    iconName: 'smartphone',
    skills: [
      { name: 'React Native', colorVariant: 'blue', proof: 'Open Source', detail: 'Building cross-platform apps (iOS/Android)' },
      { name: 'Redux', colorVariant: 'violet', proof: 'Built Projects', detail: 'Complex state management for mobile and web' },
      { name: 'Mobile UI Patterns', colorVariant: 'blue', proof: 'Built Projects', detail: 'Navigation, gestures, and performance optimization' },
    ],
  },
  {
    name: 'Databases & Cloud',
    iconName: 'database',
    skills: [
      { name: 'PostgreSQL / MySQL', colorVariant: 'blue', proof: 'Production', detail: 'Relational data modeling for complex systems' },
      { name: 'MongoDB', colorVariant: 'blue', proof: 'Production', detail: 'Flexible document storage for real-time applications' },
      { name: 'Supabase', colorVariant: 'violet', proof: 'Built Projects', detail: 'Real-time database and authentication for Q-A apps' },
      { name: 'Docker', colorVariant: 'violet', proof: 'DevOps', detail: 'Containerizing applications for consistent deployment' },
    ],
  },
  {
    name: 'Systems & Tools',
    iconName: 'cpu',
    skills: [
      { name: 'Rust', colorVariant: 'violet', proof: 'Open Source', detail: 'High-performance systems logic in Tauri/Recoil' },
      { name: 'Tauri v2', colorVariant: 'violet', proof: 'Open Source', detail: 'Next-gen desktop app development with Rust' },
      { name: 'Linux', colorVariant: 'blue', proof: 'Open Source', detail: 'System administration and CLI utility development' },
      { name: 'Git & Github', colorVariant: 'emerald', proof: '1500+ Contributions', detail: 'Version control and automated GitHub Actions' },
    ],
  },
  {
    name: 'AI & Data Science',
    iconName: 'terminal',
    skills: [
      { name: 'LLM Fine-tuning', colorVariant: 'violet', proof: 'Built Projects', detail: 'Applied PEFT and QLoRA for model optimization' },
      { name: 'LangChain', colorVariant: 'amber', proof: 'Exploring', detail: 'Building sophisticated AI agent workflows' },
      { name: 'Pandas / NumPy', colorVariant: 'violet', proof: 'Data Tools', detail: 'Data manipulation and mathematical processing' },
      { name: 'Matplotlib', colorVariant: 'violet', proof: 'Data Tools', detail: 'Scientific data visualization and plotting' },
    ],
  },
];

export const techStack = [
  'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL',
  'Next.js', 'React', 'React Native', 'Node.js', 'Express',
  'Prisma', 'PostgreSQL', 'MongoDB', 'Docker', 'Tauri',
];

export const exploring = [
  'Advanced Rust systems programming and memory safety',
  'Fine-tuning specialized LLMs for developer productivity',
  'Real-time low-latency systems with Go and Socket.IO',
  'Edge computing and distributed database architectures',
  'Cybersecurity fundamentals and secure API design',
];
