export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  type: 'work' | 'education' | 'founding' | 'freelance' | 'open-source';
}

export const experiences: Experience[] = [
  {
    id: 'nst-sdc',
    company: 'NST-SDC',
    role: 'Team Lead (Internship)',
    period: 'May 2025 — July 2025',
    location: 'Virtual',
    description: 'Designed and developed a full-scale real-time Anonymous Q-A platform from scratch, focusing on interactive features and scalable backend communication.',
    achievements: [
      'Implemented room-based chats with live messaging using Socket.IO',
      'Built interactive features including polls, reactions, and moderation tools',
      'Ensured identity-free anonymous communication with persistent state handling',
      'Used React.js, Supabase, Express, and Socket.IO to deliver a fast and scalable system',
    ],
    techStack: ['React.js', 'Supabase', 'Express', 'Socket.IO', 'Node.js'],
    type: 'work',
  },
  {
    id: 'nst-btech',
    company: 'Newton School of Technology',
    role: 'B.Tech in AI & ML',
    period: '2024 — 2028',
    location: 'Pune, India',
    description: 'Specializing in Artificial Intelligence and Machine Learning at Ajeenkya DY Patil University. Engaging in full-stack development, systems architecture, and competitive programming.',
    achievements: [
      'Maintaining a current grade of 7.86/10.0',
      'Led and organized the Nirmaan Dev-Event, managing planning and end-to-end execution',
      'Actively contributing to NST Student Developer Club projects through cross-team collaboration',
      'Achieved a 1.2K+ CodeChef rating via consistent algorithmic problem solving',
    ],
    techStack: ['AI/ML', 'Python', 'Data Structures', 'Algorithms', 'MERN'],
    type: 'education',
  },
  {
    id: 'open-source',
    company: 'Open Source & Community',
    role: 'Full Stack Developer',
    period: '2024 — Present',
    location: 'GitHub',
    description: 'Dedicated to building open-source tools and contributing to the developer ecosystem. Actively experimenting across Web, Mobile, DevOps, AI, and Cybersecurity.',
    achievements: [
      'Maintained 1,500+ GitHub contributions, continuously shipping features and fixing bugs',
      'Built Recoil — a tactical system utility using Tauri v2 (Rust) and React',
      'Developed Maverick-cli — an AI-powered intelligent CLI tool with a full-stack architecture',
      'Fine-tuned large language models on Kaggle using Hugging Face with PEFT / QLoRA',
      'Built and experimented across multiple domains applying real-world concepts to projects',
    ],
    techStack: ['Rust', 'Go', 'Python', 'TypeScript', 'Docker', 'Next.js'],
    type: 'open-source',
  },
];
