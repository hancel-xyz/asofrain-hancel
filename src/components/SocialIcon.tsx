import { GlobeIcon } from "lucide-react";

/**
 * lucide-react v1 dropped brand glyphs, and the footer's social links are
 * named freely from the admin panel ("Facebook", "IG", "WhatsApp"…), so the
 * marks live here and are matched by name, with a globe as the catch-all.
 */
const MARKS: { test: RegExp; path: string }[] = [
  {
    test: /face/i,
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    test: /^x$|twitter/i,
    path: "M17.53 3h3.01l-6.58 7.52L21.7 21h-6.06l-4.74-6.2L5.47 21H2.46l7.03-8.04L2.3 3h6.21l4.29 5.67L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81L16.47 19.2Z",
  },
  {
    test: /linked/i,
    path: "M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.3-2.02 2.66v5.14h-4v-11Z",
  },
  {
    test: /youtube|^yt$/i,
    path: "M21.58 7.2a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.43A2.5 2.5 0 0 0 2.42 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .42 4.8 2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.8ZM10 15.02V8.98L15.2 12 10 15.02Z",
  },
  {
    test: /tiktok/i,
    path: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.1v12.4a2.59 2.59 0 1 1-1.84-2.48v-3.2a5.75 5.75 0 1 0 4.94 5.7V9.4a7.3 7.3 0 0 0 4.31 1.38V7.68a4.28 4.28 0 0 1-3.25-1.86Z",
  },
  {
    test: /whats/i,
    path: "M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.19-1.36a9.93 9.93 0 0 0 4.85 1.24h.01c5.49 0 9.95-4.46 9.95-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm5.83 14.24c-.25.7-1.44 1.33-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.99-.32-1.7-.63-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09s.77-2.19 1.04-2.49c.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.33.02.53-.1.2-.15.32-.3.5-.15.17-.32.39-.45.52-.15.15-.31.31-.13.61.17.3.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z",
  },
];

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  // Instagram is the one mark that reads as an outline rather than a solid
  // silhouette, so it's assembled from primitives instead of a single path.
  if (/insta|^ig$/i.test(name)) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  const mark = MARKS.find((m) => m.test.test(name));
  if (!mark) return <GlobeIcon className={className} aria-hidden />;

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d={mark.path} />
    </svg>
  );
}
