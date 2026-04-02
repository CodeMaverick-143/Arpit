'use client';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className = '',
}: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={`code-block ${className}`}>
      <div className="code-block-header">
        <span>{filename || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors hover:text-[#a3a3a3] cursor-pointer"
          style={{ color: '#525252' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy
        </button>
      </div>
      <div className="code-block-body">
        <pre className="overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
