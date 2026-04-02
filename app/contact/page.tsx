'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Terminal from '../components/Terminal';
import MagneticButton from '../components/MagneticButton';
import { CheckIcon } from '../components/Icons';
import { socialLinks, siteConfig } from '@/data/navigation';

const contactTerminalLines = [
  { type: 'command' as const, text: 'echo "Let\'s connect"', delay: 600 },
  { type: 'output' as const, text: 'Available for collaborations, consulting, and ambitious projects.', delay: 400 },
  { type: 'empty' as const, text: '', delay: 200 },
  { type: 'command' as const, text: `echo $EMAIL`, delay: 500 },
  { type: 'output' as const, text: siteConfig.email, delay: 300 },
  { type: 'empty' as const, text: '', delay: 200 },
  { type: 'command' as const, text: 'cat availability.txt', delay: 500 },
  { type: 'output' as const, text: 'Status: Open to opportunities', delay: 300 },
  { type: 'output' as const, text: 'Response time: < 24 hours', delay: 200 },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="noise">
      {/* ═══ HERO ═══ */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-px bg-[var(--border)]" />
                <span className="brand-mono text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-tertiary)' }}>
                  Contact
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="heading-display text-5xl md:text-8xl mb-8 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Let&apos;s build
                <br />something.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-body text-lg md:text-xl mb-12 max-w-md leading-relaxed"
              >
                Available for product collaborations, startup ideas, and technical consulting.
              </motion.p>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-8 max-w-md"
              >
                {isSubmitted ? (
                  <div
                    className="p-10 rounded-2xl text-center"
                    style={{
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span className="flex items-center justify-center mb-6" style={{ color: '#10b981' }}>
                      <CheckIcon size={40} />
                    </span>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Message Sent
                    </h3>
                    <p className="text-sm text-body leading-relaxed">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <label
                        htmlFor="name"
                        className="block brand-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-5 py-4 text-sm rounded-xl outline-none transition-all duration-300 focus:ring-1 border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)] hover:border-[var(--text-muted)] focus:border-[var(--accent)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-3">
                      <label
                        htmlFor="email"
                        className="block brand-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-5 py-4 text-sm rounded-xl outline-none transition-all duration-300 focus:ring-1 border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)] hover:border-[var(--text-muted)] focus:border-[var(--accent)]"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label
                        htmlFor="message"
                        className="block brand-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-5 py-4 text-sm rounded-xl outline-none transition-all duration-300 resize-none focus:ring-1 border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)] hover:border-[var(--text-muted)] focus:border-[var(--accent)]"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>
                    <div className="pt-2">
                       <button
                         type="submit"
                         disabled={isSubmitting}
                         className="btn-primary w-full justify-center cursor-pointer disabled:opacity-50 py-4"
                       >
                         {isSubmitting ? 'Sending...' : 'Send Message'}
                       </button>
                    </div>
                  </>
                )}
              </motion.form>
            </div>

            {/* Right — Terminal + Social */}
            <div className="space-y-12">
              <ScrollReveal delay={0.2}>
                <Terminal
                  lines={contactTerminalLines}
                  title="~/contact-io"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    className="brand-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-6"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Connect
                  </h3>
                  <div className="space-y-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-2 group transition-all hover:translate-x-1"
                      >
                        <span
                          className="text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {link.label}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
