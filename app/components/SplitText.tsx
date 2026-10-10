interface SplitTextProps {
  text: string;
  className?: string;
  /** Seconds before the first word starts */
  delay?: number;
  /** Seconds between words */
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Wrap these words in the brand gradient */
  highlight?: string[];
}

/**
 * Word-by-word reveal driven by CSS (`.word-reveal` in globals.css).
 * Renders on the server and starts animating at first paint — no hydration
 * wait, so the hero heading counts toward LCP immediately. Screen readers
 * get the plain string; the animated spans are aria-hidden.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0.08,
  staggerDelay = 0.07,
  as: Tag = "h1",
  highlight = [],
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden className="inline">
        {words.map((word, i) => (
          <span
            key={i}
            className="word-reveal mr-[0.25em]"
            style={
              {
                "--i": i,
                "--base": `${delay * 1000}ms`,
                perspective: "600px",
              } as React.CSSProperties
            }
          >
            <span
              className={
                highlight.includes(word) ? "text-gradient-brand" : undefined
              }
              style={{ animationDelay: `${delay + i * staggerDelay}s` }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
