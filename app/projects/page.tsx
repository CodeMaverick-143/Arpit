'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import { projects, categories, type Category } from '@/data/projects';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory as Exclude<Category, 'All'>));

  return (
    <div className="noise">
      <section className="section">
        <div className="container-wide">
          <SectionHeading
            label="Portfolio"
            title="Selected Projects"
            description="A curated collection of projects spanning AI, systems engineering, full-stack development, and developer tools."
          />

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-14"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-5 py-2 brand-mono text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer overflow-hidden group"
                style={{
                  color: activeCategory === cat ? 'var(--background)' : 'var(--text-tertiary)',
                  background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  featured={project.featured && i === 0}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body text-lg">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
