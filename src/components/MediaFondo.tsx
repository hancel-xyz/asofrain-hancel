import { VideoFondo } from "@/components/VideoFondo";
import { isVideoMedia } from "@/lib/mediaType";
import { OSCURIDAD_POR_DEFECTO, type FondoMedia } from "@/lib/fondo";
import { cn } from "@/lib/utils";

/**
 * Paints a section's backdrop — photo or looping video — with the dark scrim
 * the editor dialled in on top of it.
 *
 * Renders nothing when no media is set, so a section can fall back to its own
 * flat colour.
 */
export function MediaFondo({
  fondo,
  className,
  children,
}: {
  fondo: FondoMedia | null;
  /** Extra layers (brand gradients, patterns) drawn above the scrim. */
  className?: string;
  children?: React.ReactNode;
}) {
  if (!fondo) return null;

  const oscuridad = fondo.oscuridad ?? OSCURIDAD_POR_DEFECTO;
  const esVideo = isVideoMedia(fondo.url, fondo.mime);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden>
      {esVideo ? (
        <VideoFondo src={fondo.url} encuadre={fondo.encuadre} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fondo.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={fondo.encuadre ? { objectPosition: fondo.encuadre } : undefined}
        />
      )}

      {/* The scrim is what makes the type on top legible; it is set per
          section from the admin rather than baked in here. */}
      <div className="absolute inset-0 bg-brand-deep" style={{ opacity: oscuridad / 100 }} />
      {children}
    </div>
  );
}
