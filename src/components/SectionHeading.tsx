import { cn } from "@/lib/utils";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/Reveal";

export type Tone = "brand" | "lime" | "slate" | "ink" | "white";

const TONE: Record<Tone, { text: string; rule: string; dot: string }> = {
  brand: { text: "text-brand-dark", rule: "bg-brand", dot: "bg-brand" },
  lime: { text: "text-brand-lime-dark", rule: "bg-brand-lime", dot: "bg-brand-lime" },
  slate: { text: "text-brand-slate", rule: "bg-brand-slate", dot: "bg-brand-slate" },
  ink: { text: "text-brand-ink/70", rule: "bg-brand-ink/30", dot: "bg-brand-ink" },
  white: { text: "text-white/80", rule: "bg-white/40", dot: "bg-white" },
};

/**
 * The eyebrow → title → subtitle stack every public section leads with.
 *
 * The three levels are deliberately far apart (tiny tracked caps with a rule,
 * a large display headline, then muted justified body copy) so a heading can
 * never be mistaken for a subheading, which was the whole complaint about the
 * previous "everything is the same grey label" look.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "brand",
  align = "left",
  as: Tag = "h2",
  size = "lg",
  className,
  titleClassName,
  highlightClassName,
  children,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  titleClassName?: string;
  highlightClassName?: string;
  children?: React.ReactNode;
}) {
  const t = TONE[tone];
  const centered = align === "center";

  const sizes = {
    sm: "text-[26px] md:text-[32px]",
    md: "text-[30px] md:text-[40px]",
    lg: "text-[36px] md:text-[48px]",
    xl: "text-[clamp(36px,5.5vw,64px)]",
  } as const;

  return (
    <Reveal className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-2.5 mb-4 md:mb-5",
            centered && "justify-center"
          )}
        >
          <span className={cn("h-[2px] w-7 rounded-full", t.rule)} />
          <span
            className={cn(
              "text-[11px] tracking-[2.5px] font-bold uppercase",
              t.text
            )}
          >
            {eyebrow}
          </span>
          <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
        </div>
      )}

      {title && (
        <Tag
          className={cn(
            "font-display font-semibold leading-[1.05] tracking-[-0.02em] m-0",
            tone === "white" ? "text-white" : "text-brand-ink",
            sizes[size],
            titleClassName
          )}
        >
          <HighlightText text={title} highlightClassName={highlightClassName} />
        </Tag>
      )}

      {subtitle && (
        <p
          className={cn(
            "text-[15.5px] md:text-[16.5px] leading-[1.7] mt-4 md:mt-5 max-w-[560px] text-just",
            tone === "white" ? "text-white/75" : "text-brand-muted",
            centered && "mx-auto text-center"
          )}
        >
          {subtitle}
        </p>
      )}

      {children}
    </Reveal>
  );
}
