"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, XIcon } from "lucide-react";

/**
 * The institutional video on the home page.
 *
 * It loops silently in place — no click needed — because browsers only allow
 * autoplay when a video is muted. The expand button opens the same clip in a
 * viewer with real controls and sound for whoever wants to actually watch it.
 */
export function VideoInstitucional({ src, titulo }: { src: string; titulo?: string }) {
  const inlineRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // A ref, not state: nothing on screen depends on it, and reading the media
  // query during an effect must not trigger another render.
  const reducedMotion = useRef(false);

  const label = titulo ? `Video institucional: ${titulo}` : "Video institucional";

  useEffect(() => {
    const video = inlineRef.current;
    if (!video) return;

    // Someone who asked for less motion shouldn't get a video looping at them;
    // they can still open it deliberately.
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      video.autoplay = false;
      video.pause();
      return;
    }

    // Some browsers refuse even muted autoplay (data saver, low power mode).
    // The first frame plus the "Ver video" button still make sense there.
    video.play().catch(() => {});
  }, []);

  // Pause the looping background copy while the viewer is open, so two
  // streams aren't decoding at once.
  useEffect(() => {
    const video = inlineRef.current;
    if (!video) return;
    if (open) video.pause();
    else if (!reducedMotion.current) video.play().catch(() => {});
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-105">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={inlineRef}
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir el video en grande, con sonido"
        className="absolute top-5 right-5 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2.5 text-[12.5px] font-bold text-brand-ink shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <PlayIcon className="h-4 w-4" aria-hidden />
        Ver video
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-brand-deep/92 backdrop-blur-md" aria-hidden></div>
          <div className="absolute inset-0 text-white/[0.06] pattern-dots-lg pointer-events-none" aria-hidden></div>

          <div className="relative w-full max-w-[1100px]">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar el video"
              className="absolute -top-3 right-0 md:-top-14 md:right-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-brand-ink shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-90"
            >
              <XIcon className="h-5 w-5" aria-hidden />
            </button>

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={src}
              className="w-full max-h-[80vh] rounded-[20px] bg-black shadow-2xl"
              controls
              autoPlay
              loop
              playsInline
              aria-label={label}
            />
          </div>
        </div>
      )}
    </>
  );
}
