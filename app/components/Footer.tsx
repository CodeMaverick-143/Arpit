'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { navLinks, socialLinks, siteConfig } from '@/data/navigation';
import { GitHubIcon, LinkedinIcon, XIcon, MailIcon, KaggleIcon } from './Icons';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-0)' }}
    >
      <div className="container-wide section-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="brand-mono text-sm font-bold tracking-tight" style={{ color: 'var(--text-secondary)' }}>
                ~/arpitsarang
              </span>
            </Link>
            <p className="text-body text-sm max-w-md mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-2)]"
                  style={{ color: 'var(--text-tertiary)' }}
                  aria-label={link.label}
                >
                  <SocialIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Connect
            </h4>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-[11px] font-medium tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
            © {currentYear} {siteConfig.name}. Crafted with precision.
          </p>
          <div className="flex items-center gap-4">
            <span className="brand-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Next.js · TypeScript · Framer Motion
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'github':
      return <GitHubIcon size={18} />;
    case 'linkedin':
      return <LinkedinIcon size={18} />;
    case 'twitter':
      return <XIcon size={18} />;
    case 'kaggle':
      return <KaggleIcon size={18} />;
    case 'email':
      return <MailIcon size={18} />;
    default:
      return null;
  }
}

