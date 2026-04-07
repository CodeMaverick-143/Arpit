export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/CodeMaverick-143', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arpitsarang', icon: 'linkedin' },
  { label: 'Twitter / X', href: 'https://x.com/CodeMaverick143', icon: 'twitter' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/codemaverick143', icon: 'kaggle' },
  { label: 'Email', href: 'mailto:arpit.01.sarang.2005@gmail.com', icon: 'email' },
];

export interface CommandItem {
  id: string;
  label: string;
  href: string;
  section: string;
  keywords: string[];
}

export const commandItems: CommandItem[] = [
  { id: 'home', label: 'Home', href: '/', section: 'Pages', keywords: ['landing', 'hero'] },
  { id: 'about', label: 'About', href: '/about', section: 'Pages', keywords: ['bio', 'story', 'skills'] },
  { id: 'projects', label: 'Projects', href: '/projects', section: 'Pages', keywords: ['work', 'portfolio'] },
  { id: 'experience', label: 'Experience', href: '/experience', section: 'Pages', keywords: ['career', 'work', 'timeline'] },
  { id: 'blog', label: 'Blog', href: '/blog', section: 'Pages', keywords: ['articles', 'writing'] },
  { id: 'contact', label: 'Contact', href: '/contact', section: 'Pages', keywords: ['email', 'hire', 'connect'] },
  { id: 'github', label: 'GitHub', href: 'https://github.com/CodeMaverick-143', section: 'Social', keywords: ['code', 'repos'] },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/arpitsarang', section: 'Social', keywords: ['professional'] },
  { id: 'twitter', label: 'Twitter / X', href: 'https://x.com/CodeMaverick143', section: 'Social', keywords: ['tweets'] },
  { id: 'kaggle', label: 'Kaggle', href: 'https://www.kaggle.com/codemaverick143', section: 'Social', keywords: ['data', 'ml', 'ai'] },
  { id: 'resume', label: 'Download Resume', href: '/resume.pdf', section: 'Actions', keywords: ['cv', 'pdf', 'hire', 'bio'] },
];

export const siteConfig = {
  name: 'Arpit Sarang',
  title: 'Full-stack Engineer • Specialized in MERN & TypeScript',
  tagline: 'Architecting Scalable Systems, Developer Utilities, and AI-Powered Workflows',
  description: 'Full-stack Developer specializing in the MERN stack, TypeScript, and MySQL. Experienced in backend architecture with exposure to Golang and Python. Building open-source solutions for high-performance development workflows.',
  url: 'https://arpitsarang.xplnhub.tech',
  email: 'arpit.01.sarang.2005@gmail.com',
  resume: '/resume.pdf',
};

