/**
 * Photos from the sensibilización campaigns, shipped with the app in
 * `public/Sensibilizaciones/`.
 *
 * They fill the picture slots that would otherwise sit empty until someone
 * uploads something from the admin panel, so the site reads like the brand's
 * printed pieces — stat next to photo — from day one. Anything uploaded in
 * the admin always wins over these.
 *
 * The list is written out rather than read from disk because `public/` is
 * served as static assets and is not guaranteed to exist on the serverless
 * filesystem at request time. To add or remove photos, drop the files in that
 * folder (named `sensibilizacion-NN.jpeg`) and update the count below.
 */
const TOTAL = 25;

export const FOTOS_SENSIBILIZACION: string[] = Array.from(
  { length: TOTAL },
  (_, i) => `/Sensibilizaciones/sensibilizacion-${String(i + 1).padStart(2, "0")}.jpeg`
);

/**
 * Picks a photo for position `index`.
 *
 * The choice is spread across the set but stays stable: the server and the
 * browser must agree on it, and a picture that changed on every render would
 * flicker. `offset` lets each section start somewhere else so two sections on
 * the same page don't show the same photo.
 */
export function fotoAt(index: number, offset = 0): string {
  const total = FOTOS_SENSIBILIZACION.length;
  // Stepping by a number coprime with the total walks the whole set instead of
  // repeating a short cycle.
  return FOTOS_SENSIBILIZACION[((index * 7 + offset) % total + total) % total];
}
