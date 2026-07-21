import React from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImageSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  src?: string;
  alt?: string;
}

export function isRealImageUrl(src?: string): src is string {
  return !!src && (/^(https?:)?\/\//.test(src) || src.startsWith("blob:") || src.startsWith("data:"));
}

export function ImageSlot({ placeholder, src, alt, className, ...props }: ImageSlotProps) {
  if (isRealImageUrl(src)) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden", className)} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || placeholder || ""} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
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
