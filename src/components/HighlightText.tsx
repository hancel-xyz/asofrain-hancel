import React from 'react';
import { cn } from "@/lib/utils";

interface HighlightTextProps {
  text: string;
  highlightClassName?: string;
  className?: string;
}

export function HighlightText({
  text,
  highlightClassName = "font-display font-semibold not-italic text-[#62AF9D]",
  className
}: HighlightTextProps) {
  if (!text) return null;

  // This regex matches text enclosed in asterisks: *word* or *multiple words*
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i} className={cn(highlightClassName)}>
              {part.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
