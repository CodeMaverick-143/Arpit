'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TerminalLine {
  type: 'prompt' | 'command' | 'output' | 'empty';
  text: string;
  delay?: number;
}

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
  autoStart?: boolean;
}

export default function Terminal({
  lines,
  title = 'terminal',
  className = '',
  autoStart = true,
}: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const typeText = useCallback(
    (text: string, lineIndex: number) => {
      return new Promise<void>((resolve) => {
        if (prefersReducedMotion) {
          setCurrentText(text);
          resolve();
          return;
        }
        let charIndex = 0;
        setIsTyping(true);
        const interval = setInterval(() => {
          if (charIndex <= text.length) {
            setCurrentText(text.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(interval);
            setIsTyping(false);
            resolve();
          }
        }, 30);
      });
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    if (!autoStart) return;

    const runSequence = async () => {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const delay = line.delay || (line.type === 'output' ? 300 : 500);

        await new Promise((r) => setTimeout(r, delay));

        if (line.type === 'command') {
          await typeText(line.text, i);
        } else {
          setCurrentText('');
        }

        setVisibleLines(i + 1);
      }
    };

    runSequence();
  }, [autoStart, lines, typeText]);

  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-header">
        <div className="flex gap-1.5 px-1">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="flex-1 text-center brand-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          {title}
        </span>
        <div className="w-12" /> {/* Balancing spacer */}
      </div>
      <div className="terminal-body font-code">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="min-h-[1.6rem] flex items-start gap-3">
            {line.type === 'command' && (
              <div className="flex gap-2 w-full">
                <span className="terminal-prompt select-none">❯</span>
                <span className="terminal-command break-all">
                  {i === visibleLines - 1 && isTyping ? currentText : line.text}
                </span>
                {i === visibleLines - 1 && isTyping && <span className="terminal-cursor" />}
              </div>
            )}
            {line.type === 'output' && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="terminal-output flex-1 leading-relaxed"
              >
                {line.text}
              </motion.div>
            )}
            {line.type === 'empty' && <br />}
          </div>
        ))}
        {visibleLines === lines.length && !isTyping && (
          <div>
            <span className="terminal-prompt">❯ </span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
