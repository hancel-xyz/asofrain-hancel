"use client";

import { useEffect, useRef } from "react";

/**
 * Splits an admin-entered figure such as "699.564", "+120", "3" or "98 %"
 * into the parts we can animate: a literal prefix, the number itself, the
 * thousands separator it was typed with, and a literal suffix.
 *
 * Returns null when there is no number to count (e.g. an empty metric), so
 * the caller can just print the raw text untouched.
 */
function parseFigure(raw: string) {
  const match = raw.match(/^(\D*?)([\d][\d.,\s]*\d|\d)(\D*)$/);
  if (!match) return null;

  const [, prefix, body, suffix] = match;
  const separator = body.includes(".") ? "." : body.includes(",") ? "," : "";
  const value = Number(body.replace(/[.,\s]/g, ""));
  if (!Number.isFinite(value)) return null;

  return { prefix, suffix, separator, value };
}

function group(value: number, separator: string) {
  const digits = String(value);
  if (!separator) return digits;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Counts a metric up from zero the first time it scrolls into view.
 *
 * The rendered output is always the final figure, so the number is correct
 * with JavaScript disabled, for crawlers, and during hydration; the animation
 * writes to the DOM node directly afterwards, which also keeps React from
 * re-rendering this node while the rest of the page is still hydrating.
 */
export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const parsed = parseFigure(value);
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        const render = (n: number) => {
          node.textContent = `${parsed.prefix}${group(n, parsed.separator)}${parsed.suffix}`;
        };

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast out of the gate, long settle on the real figure
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          render(Math.round(parsed.value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
          else node.textContent = value; // land exactly on what the admin typed
        };

        render(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
