/**
 * Tells apart the two kinds of file the "media institucional" slot accepts.
 *
 * Lives apart from `lib/media.ts` (which talks to InsForge Storage and is
 * server-only) so client components can import it too.
 */

// InsForge urls carry a `?v=` cache buster, so the extension is not at the end.
const VIDEO_EXTENSIONS = /\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i;

/**
 * Whether a stored media item should be played rather than shown.
 *
 * The mime type recorded at upload time wins; older entries saved before
 * videos were supported have no mime, so the url extension is the fallback.
 */
export function isVideoMedia(url?: string, mime?: string): boolean {
  if (mime) return mime.startsWith("video/");
  if (!url) return false;
  return VIDEO_EXTENSIONS.test(url);
}
