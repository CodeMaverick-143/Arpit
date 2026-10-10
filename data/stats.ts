import { projects } from "./projects";
import { skillCategories } from "./skills";

/**
 * Derived site stats — computed from the data files so the numbers on the
 * homepage, experience page and terminal never drift from reality.
 */
export const stats = {
  projects: projects.length,
  liveProducts: projects.filter((p) => p.live).length,
  mobileApps: projects.filter((p) => p.category.includes("Mobile")).length,
  coreStacks: skillCategories.length,
  totalSkills: skillCategories.reduce((sum, c) => sum + c.skills.length, 0),
};

/** What's being worked on right now — surfaces in the hero and About bento. */
export const now = {
  building: "IdeaToIPO",
  buildingDescription: "AI multi-agent platform for startup founders",
  learning: "Rust memory models & LLM fine-tuning",
  location: "India · Remote-friendly",
  status: "Open to collaborations",
};
