import type { Metadata } from "next";
import SplitText from "../components/SplitText";
import ScrollReveal from "../components/ScrollReveal";
import HeroTerminal from "../components/HeroTerminal";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import { socialLinks, siteConfig } from "@/data/navigation";
import { ArrowUpRightIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Available for product collaborations, startup ideas, and technical consulting.",
};

const contactTerminalLines = [
  { type: "command" as const, text: 'echo "Let\'s connect"', delay: 600 },
  {
    type: "output" as const,
    text: "Available for collaborations, consulting, and ambitious projects.",
    delay: 400,
  },
  { type: "empty" as const, text: "", delay: 200 },
  { type: "command" as const, text: "echo $EMAIL", delay: 500 },
  { type: "output" as const, text: siteConfig.email, delay: 300 },
  { type: "empty" as const, text: "", delay: 200 },
  { type: "command" as const, text: "cat availability.txt", delay: 500 },
  {
    type: "output" as const,
    text: "Status: Open to opportunities",
    delay: 300,
  },
  { type: "output" as const, text: "Response time: < 24 hours", delay: 200 },
];

export default function ContactPage() {
  return (
    <div className="noise">
      <section className="section relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 10% 10%, var(--mesh-1), transparent 70%)",
          }}
        />
        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Form */}
            <div>
              <div
                className="hero-reveal flex items-center gap-3 mb-8"
                style={{ "--d": "0ms" } as React.CSSProperties}
              >
                <div
                  className="w-10 h-px"
                  style={{ background: "var(--brand)" }}
                />
                <span
                  className="brand-mono text-[11px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Contact
                </span>
              </div>
              <SplitText
                as="h1"
                text="Let's build something."
                highlight={["something."]}
                className="heading-display text-hero mb-8 tracking-tight"
              />
              <p
                className="hero-reveal text-body text-lead mb-6 max-w-md leading-relaxed"
                style={{ "--d": "300ms" } as React.CSSProperties}
              >
                Available for product collaborations, startup ideas, and
                technical consulting.
              </p>
              <div
                className="hero-reveal mb-12"
                style={{ "--d": "380ms" } as React.CSSProperties}
              >
                <CopyEmail email={siteConfig.email} />
              </div>

              <div
                className="hero-reveal"
                style={{ "--d": "450ms" } as React.CSSProperties}
              >
                <ContactForm />
              </div>
            </div>

            {/* Right — Terminal + Social */}
            <div className="space-y-12">
              <HeroTerminal lines={contactTerminalLines} title="~/contact-io" />

              <ScrollReveal delay={0.2}>
                <div
                  data-spotlight
                  className="p-8 rounded-2xl"
                  style={{
                    background: "var(--surface-1)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="brand-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Connect
                  </h3>
                  <ul className="space-y-1">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between py-3 min-h-11 group transition-transform hover:translate-x-1"
                        >
                          <span
                            className="text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {link.label}
                          </span>
                          <ArrowUpRightIcon
                            size={14}
                            className="transition-colors group-hover:text-[var(--brand)]"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
