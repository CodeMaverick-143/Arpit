'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const others = blogPosts.filter((p) => !p.featured);

  return (
    <div className="noise">
      <section className="section">
        <div className="container-wide">
          <SectionHeading
            label="Writing"
            title="Blog"
            description="Thoughts on engineering, systems design, AI, startups, and building products. A developer-founder journal."
          />

          {/* Featured Post */}
          {featured && (
            <ScrollReveal className="mb-12">
              <Link href={`/blog/${featured.slug}`}>
                <div
                  className="group p-8 md:p-12 rounded-xl transition-all duration-300 hover:border-[var(--text-muted)]"
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="brand-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
                      Featured
                    </span>
                    <span className="brand-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {formatDate(featured.date)}
                    </span>
                    <span className="brand-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      · {featured.readTime}
                    </span>
                  </div>
                  <h2
                    className="heading-section text-3xl md:text-5xl mb-6 group-hover:text-gradient transition-all leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-body text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="brand-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Post List */}
          <div className="space-y-4">
            {others.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <div
                    className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 p-8 rounded-xl transition-all duration-300 hover:border-[var(--text-muted)]"
                    style={{
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-xl font-bold tracking-tight mb-2 group-hover:text-gradient transition-all"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-body line-clamp-1 opacity-70">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-8 flex-shrink-0">
                      <div className="hidden sm:flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="brand-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm"
                            style={{
                              color: 'var(--text-tertiary)',
                              background: 'var(--surface-2)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="brand-mono text-[10px] font-bold uppercase tracking-wider flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                          {post.readTime}
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="flex-shrink-0 transition-transform group-hover:translate-x-1.5"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
