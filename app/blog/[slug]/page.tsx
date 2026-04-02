'use client';

export const runtime = 'edge';


import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const { progress } = useScrollProgress();

  if (!post) {
    return (
      <div className="section text-center">
        <div className="container-tight">
          <h1 className="heading-display text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
            Post Not Found
          </h1>
          <Link href="/blog" className="btn-secondary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="noise">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          background: 'var(--accent)',
          scaleX: progress,
        }}
      />

      {/* Header */}
      <section className="section-sm">
        <div className="container-tight">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-10"
          >
            <Link
              href="/blog"
              className="brand-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Blog
            </Link>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <span className="brand-mono text-[10px] font-bold uppercase tracking-[0.2em] truncate max-w-[200px]" style={{ color: 'var(--text-secondary)' }}>
              {post.title}
            </span>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="flex flex-col gap-1">
              <span className="brand-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                Published
              </span>
              <span className="brand-mono text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                {formatDate(post.date)}
              </span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="flex flex-col gap-1">
              <span className="brand-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                Reading Time
              </span>
              <span className="brand-mono text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                {post.readTime}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="heading-display text-4xl md:text-7xl mb-10 tracking-tight leading-[1.05]"
            style={{ color: 'var(--text-primary)' }}
          >
            {post.title}
          </motion.h1>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-16"
          >
            {post.tags.map((tag) => (
              <span key={tag} className="brand-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="divider" />
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="container-tight">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="prose"
          >
            {/* Render content as formatted text */}
            {post.content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i}>{block.replace('## ', '')}</h2>
                );
              }
              if (block.startsWith('### ')) {
                return (
                  <h3 key={i}>{block.replace('### ', '')}</h3>
                );
              }
              if (block.startsWith('```')) {
                const lines = block.split('\n');
                const lang = lines[0].replace('```', '');
                const code = lines.slice(1, -1).join('\n');
                return (
                  <div key={i} className="my-8">
                    <div className="code-block">
                      <div className="code-block-header">
                        <span>{lang || 'code'}</span>
                      </div>
                      <div className="code-block-body">
                        <pre><code>{code}</code></pre>
                      </div>
                    </div>
                  </div>
                );
              }
              if (block.startsWith('| ')) {
                const rows = block.split('\n').filter((r) => !r.startsWith('|--') && !r.startsWith('| --'));
                return (
                  <div key={i} className="my-8 overflow-x-auto">
                    <table
                      className="w-full text-sm"
                      style={{ borderCollapse: 'collapse' }}
                    >
                      <thead>
                        <tr>
                          {rows[0]?.split('|').filter(Boolean).map((cell, ci) => (
                            <th
                              key={ci}
                              className="text-left py-2 px-3 font-semibold"
                              style={{
                                color: 'var(--text-primary)',
                                borderBottom: '1px solid var(--border)',
                              }}
                            >
                              {cell.trim()}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(1).map((row, ri) => (
                          <tr key={ri}>
                            {row.split('|').filter(Boolean).map((cell, ci) => (
                              <td
                                key={ci}
                                className="py-2 px-3"
                                style={{
                                  color: 'var(--text-secondary)',
                                  borderBottom: '1px solid var(--border)',
                                }}
                              >
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (block.startsWith('1. ') || block.startsWith('- ')) {
                const items = block.split('\n');
                const isOrdered = block.startsWith('1. ');
                const Tag = isOrdered ? 'ol' : 'ul';
                return (
                  <Tag key={i}>
                    {items.map((item, ii) => (
                      <li key={ii}>
                        {item.replace(/^\d+\.\s*\*\*/, '').replace(/\*\*/, '').replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').replace(/\*\*/g, '')}
                      </li>
                    ))}
                  </Tag>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </motion.article>

          {/* Footer Navigation */}
          <div
            className="mt-16 pt-8 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <Link href="/blog" className="btn-secondary">
              ← All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
