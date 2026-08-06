/**
 * Photos from the sensibilización campaigns, shipped with the app in
 * `public/Sensibilizaciones/`.
 *
 * They fill the picture slots that would otherwise sit empty until someone
 * uploads something from the admin panel, so the site reads like the brand's
 * printed pieces — a figure never travels without a face beside it. Anything
 * uploaded in the admin always wins over these.
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
 * `count` different photos, drawn at random.
 *
 * **Server components only.** These pages are rendered per request, so the
 * selection changes on every visit — which is the point. Calling this from a
 * client component would make the server and the browser disagree about the
 * markup and break hydration.
 *
 * Never repeats within one call unless more photos are asked for than exist.
 */
export function fotosAlAzar(count: number): string[] {
  const pool = [...FOTOS_SENSIBILIZACION];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const out: string[] = [];
  while (out.length < count && pool.length > 0) {
    out.push(...pool.slice(0, Math.min(count - out.length, pool.length)));
  }
  return out;
}

/** One photo at random. Server components only — see `fotosAlAzar`. */
export function fotoAlAzar(): string {
  return fotosAlAzar(1)[0];
}
