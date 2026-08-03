import React from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImageSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  src?: string;
  alt?: string;
  /**
   * Which part of the photo to keep when it gets cropped to the slot, as a
   * CSS `object-position` value (e.g. `"50% 30%"`). Chosen per image in the
   * admin panel so faces and banners don't get cut off; defaults to centre.
   */
  focal?: string;
  imgClassName?: string;
}

export function isRealImageUrl(src?: string): src is string {
  return !!src && (/^(https?:)?\/\//.test(src) || src.startsWith("blob:") || src.startsWith("data:"));
}

/** Normalizes a stored focal point into a usable `object-position` string. */
export function focalToPosition(focal?: string | { x?: number; y?: number } | null): string {
  if (!focal) return "50% 50%";
  if (typeof focal === "string") return focal.trim() || "50% 50%";
  const x = typeof focal.x === "number" ? focal.x : 50;
  const y = typeof focal.y === "number" ? focal.y : 50;
  return `${x}% ${y}%`;
}

export function ImageSlot({ placeholder, src, alt, className, focal, imgClassName, ...props }: ImageSlotProps) {
  if (isRealImageUrl(src)) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden", className)} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || placeholder || ""}
          className={cn("absolute inset-0 w-full h-full object-cover", imgClassName)}
          style={focal ? { objectPosition: focal } : undefined}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-black/5 text-black/40 overflow-hidden relative w-full h-full",
        className
      )}
      {...props}
    >
      <ImageIcon className="w-8 h-8 mb-2 opacity-30" />
      {placeholder && (
        <span className="text-[10px] font-medium text-center px-4 leading-tight opacity-70 uppercase tracking-wider">
          {placeholder}
        </span>
      )}
    </div>
  );
}
