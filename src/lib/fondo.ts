/**
 * Background media: the photo *or* video behind a section, plus how far it is
 * dimmed so the type on top stays readable.
 *
 * Shared by every section that has a backdrop — the three heroes, the
 * institutional card, the two quote bands and the footer — so an editor sets
 * them all the same way and the site reads them all the same way.
 */
export interface FondoMedia {
  url: string;
  key?: string;
  mime?: string;
  /** `object-position` for the crop, e.g. "50% 30%". */
  encuadre?: string;
  /** Strength of the dark scrim over the media, 0–100. */
  oscuridad?: number;
}

/** Default scrim when a section has never been configured. */
export const OSCURIDAD_POR_DEFECTO = 45;

/** Largest upload we accept, matching the Server Action body limit. */
export const MAX_MB_FONDO = 45;

/**
 * Reads a background out of whatever the admin saved, tolerating the older
 * shapes: sections used to store a bare `{ valor }` image and no scrim.
 */
export function leerFondo(raw: unknown): FondoMedia | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const url = typeof o.url === "string" && o.url ? o.url : typeof o.valor === "string" ? o.valor : "";
  if (!url) return null;

  const oscuridad = typeof o.oscuridad === "number" ? o.oscuridad : OSCURIDAD_POR_DEFECTO;
  return {
    url,
    key: typeof o.key === "string" ? o.key : undefined,
    mime: typeof o.mime === "string" ? o.mime : undefined,
    encuadre: typeof o.encuadre === "string" ? o.encuadre : undefined,
    oscuridad: Math.min(100, Math.max(0, oscuridad)),
  };
}

/**
 * Reads the fields `FondoMediaField` submits back into a stored background.
 *
 * Returns the previous value untouched when nothing was uploaded and no scrim
 * was sent, so saving an unrelated part of a section never wipes its backdrop.
 */
export function leerFondoDeFormData(
  formData: FormData,
  name: string,
  existing: unknown
): Record<string, unknown> | undefined {
  const url = formData.get(`${name}_url`)?.toString() || "";
  const oscuridadRaw = formData.get(`${name}_oscuridad`)?.toString();
  const previo = (existing && typeof existing === "object" ? existing : {}) as Record<string, unknown>;

  if (!url && oscuridadRaw === undefined) return existing as Record<string, unknown> | undefined;

  const key = formData.get(`${name}_key`)?.toString();
  const mime = formData.get(`${name}_mime`)?.toString();
  const encuadre = formData.get(`${name}_encuadre`)?.toString();
  const oscuridad = oscuridadRaw !== undefined ? Number(oscuridadRaw) : undefined;

  return {
    ...previo,
    ...(url ? { url } : {}),
    ...(key ? { key } : {}),
    ...(mime ? { mime } : {}),
    ...(encuadre ? { encuadre } : {}),
    ...(Number.isFinite(oscuridad) ? { oscuridad: Math.min(100, Math.max(0, oscuridad as number)) } : {}),
  };
}
