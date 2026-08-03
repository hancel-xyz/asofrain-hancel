"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction the element travels from. Defaults to "up". */
  variant?: RevealVariant;
  /** Stagger, in milliseconds, applied as a transition delay. */
  delay?: number;
  /** Render as a different tag when the wrapper must be semantic (e.g. "li"). */
  as?: "div" | "section" | "article" | "li" | "span";
}

/**
 * Fades + slides its children in the first time they scroll into view.
 *
 * The wrapper keeps whatever className it's given, so it can safely *be* the
 * grid/flex item instead of adding an extra layout box around it. Animation
 * lives in globals.css (`.reveal` / `.is-visible`) so nothing flashes before
 * hydration and `prefers-reduced-motion` is honoured in one place.
 *
 * `is-visible` is toggled straight on the DOM node rather than through state:
 * an observer that fires while React is still hydrating the rest of the page
 * would otherwise re-render this node mid-hydration and trip a mismatch
 * warning — and this element's markup never depends on anything else.
 */
export function Reveal({
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // The wrapper tag is caller-chosen, so the shared div-shaped prop bag can't
  // be narrowed to one element interface.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = Tag as any;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already on screen at mount (above the fold) reveals right away,
    // otherwise hero content would sit invisible until the first scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={ref}
      data-variant={variant}
      className={cn("reveal", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Element>
  );
}
