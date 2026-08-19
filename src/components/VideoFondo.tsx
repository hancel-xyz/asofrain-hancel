"use client";

import { useEffect, useRef } from "react";

/**
 * A video used purely as a backdrop: it loops silently on its own, with no
 * controls, so the section behaves exactly as it would with a photo.
 *
 * Muted is not a style choice — browsers only autoplay muted video.
 */
export function VideoFondo({ src, encuadre }: { src: string; encuadre?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Someone who asked for less motion gets the first frame, held still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.autoplay = false;
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={ref}
      src={src}
      className="absolute inset-0 h-full w-full object-cover"
      style={encuadre ? { objectPosition: encuadre } : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  );
}
