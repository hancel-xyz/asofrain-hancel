import {
  AwardIcon,
  Building2Icon,
  BoxesIcon,
  ClipboardCheckIcon,
  FactoryIcon,
  GraduationCapIcon,
  HandshakeIcon,
  HeartHandshakeIcon,
  HouseIcon,
  LandmarkIcon,
  LeafIcon,
  LifeBuoyIcon,
  LightbulbIcon,
  MapPinIcon,
  MegaphoneIcon,
  RecycleIcon,
  RouteIcon,
  ScaleIcon,
  SchoolIcon,
  ShieldCheckIcon,
  SproutIcon,
  StoreIcon,
  TruckIcon,
  UsersIcon,
  UtensilsIcon,
  WarehouseIcon,
  type LucideIcon,
} from "lucide-react";

/* ==========================================================================
   Accents
   All public content is admin-editable, so the palette is applied by
   *position* (item 1 gets teal, item 2 slate, item 3 lime…) rather than being
   stored per record. Class strings are written out in full because Tailwind
   only ships the classes it can find literally in the source.
   ========================================================================== */

export interface Accent {
  /** Tinted surface for a card body. */
  soft: string;
  /** Border that matches the surface. */
  ring: string;
  /** Filled circle/square behind an icon. */
  chip: string;
  /** Accent-coloured text (eyebrows, numerals). */
  text: string;
  /** Fully saturated surface, for the one card per group that should shout. */
  solid: string;
  /** Bare hex, for gradients and inline SVG. */
  hex: string;
}

/**
 * The identity's greens, each worked up into the five surfaces a card needs.
 * `soft` values are light tints of the same hue — the identity's own colours
 * are too saturated to sit behind body copy.
 */
export const ACCENTS: Record<"pasto" | "esmeralda" | "lima" | "bosque" | "mint", Accent> = {
  pasto: {
    soft: "bg-[#DDF0DE]",
    ring: "border-[#4CAF50]/45",
    chip: "bg-[#4CAF50]/25 text-[#006B4D]",
    text: "text-[#006B4D]",
    solid: "bg-[#4CAF50] text-[#111111]",
    hex: "#4CAF50",
  },
  esmeralda: {
    soft: "bg-[#D9EBE3]",
    ring: "border-[#006B4D]/40",
    chip: "bg-[#006B4D]/18 text-[#006B4D]",
    text: "text-[#006B4D]",
    solid: "bg-[#006B4D] text-white",
    hex: "#006B4D",
  },
  lima: {
    soft: "bg-[#EEF6D7]",
    ring: "border-[#A6CE39]/55",
    chip: "bg-[#A6CE39]/32 text-[#5B7A12]",
    text: "text-[#5B7A12]",
    solid: "bg-[#A6CE39] text-[#111111]",
    hex: "#A6CE39",
  },
  bosque: {
    soft: "bg-[#D6E5DE]",
    ring: "border-[#004D33]/35",
    chip: "bg-[#004D33]/18 text-[#004D33]",
    text: "text-[#004D33]",
    solid: "bg-[#004D33] text-white",
    hex: "#004D33",
  },
  mint: {
    soft: "bg-[#EDF6E2]",
    ring: "border-[#8FBF6F]/50",
    chip: "bg-[#C8E6A0] text-[#004D33]",
    text: "text-[#4A5A52]",
    solid: "bg-[#8FBF6F] text-[#111111]",
    hex: "#8FBF6F",
  },
};

/**
 * Rotation used wherever a list of equal-weight cards needs colour. The order
 * alternates light and dark so neighbouring cards never blur together.
 */
export const ACCENT_CYCLE: Accent[] = [
  ACCENTS.pasto,
  ACCENTS.esmeralda,
  ACCENTS.lima,
  ACCENTS.bosque,
];

export const accentAt = (index: number) => ACCENT_CYCLE[index % ACCENT_CYCLE.length];

/* ==========================================================================
   Icons
   Titles come from the admin panel and can be reworded at any time, so icons
   are resolved by keyword with a positional fallback — an edited title never
   leaves a card iconless.
   ========================================================================== */

type Rule = [RegExp, LucideIcon];

const SERVICE_RULES: Rule[] = [
  [/recuper/i, RecycleIcon],
  [/recolec/i, RouteIcon],
  [/transport/i, TruckIcon],
  [/clasific|almacen|eca/i, WarehouseIcon],
  [/pesaje|trazab|report|sui/i, ScaleIcon],
  [/compact/i, BoxesIcon],
  [/certific|verific/i, ClipboardCheckIcon],
];

const VALUE_RULES: Rule[] = [
  [/ambient|ecol|verde/i, LeafIcon],
  [/social|comunidad/i, HeartHandshakeIcon],
  [/integridad|transparen|ética|etica/i, ShieldCheckIcon],
  [/respeto|digni/i, HandshakeIcon],
  [/calidad|mejora/i, AwardIcon],
  [/equipo|asociaci|junt/i, UsersIcon],
  [/innovaci|tecnolog/i, LightbulbIcon],
  [/servicio|atenci|usuario/i, LifeBuoyIcon],
];

const SECTOR_RULES: Rule[] = [
  [/residencial|hogar|casa|vivienda/i, HouseIcon],
  [/conjunto|propiedad|edificio|horizontal/i, Building2Icon],
  [/comerc|tienda|local|negocio/i, StoreIcon],
  [/restaurant|gastro|alimento/i, UtensilsIcon],
  [/colegio|escuela|educa|universidad/i, GraduationCapIcon],
  [/institucion|entidad|público|publico|alcald/i, LandmarkIcon],
  [/industr|empresa|fábrica|fabrica/i, FactoryIcon],
];

const METRIC_RULES: Rule[] = [
  [/tonelad|kilo|peso/i, ScaleIcon],
  [/localidad|zona|barrio|ciudad/i, MapPinIcon],
  [/eca|estaci|bodega|planta/i, WarehouseIcon],
  [/recuperador|familia|persona|asociad/i, UsersIcon],
  [/año|ano|experien/i, AwardIcon],
];

const AWARENESS_RULES: Rule[] = [
  [/niñ|nino|infan|semilla|colegio|escuela/i, SproutIcon],
  [/propiedad|conjunto|horizontal|edificio/i, Building2Icon],
  [/usuario|general|barrio|comunidad/i, MegaphoneIcon],
  [/taller|capacit|forma/i, SchoolIcon],
];

function resolve(rules: Rule[], fallbacks: LucideIcon[], text: string, index: number) {
  for (const [pattern, icon] of rules) {
    if (pattern.test(text)) return icon;
  }
  return fallbacks[index % fallbacks.length];
}

export const serviceIcon = (text: string, index: number) =>
  resolve(SERVICE_RULES, [RecycleIcon, RouteIcon, TruckIcon, WarehouseIcon, ScaleIcon], text, index);

export const valueIcon = (text: string, index: number) =>
  resolve(
    VALUE_RULES,
    [LeafIcon, HeartHandshakeIcon, ShieldCheckIcon, HandshakeIcon, AwardIcon, UsersIcon, LightbulbIcon, LifeBuoyIcon],
    text,
    index
  );

export const sectorIcon = (text: string, index: number) =>
  resolve(SECTOR_RULES, [HouseIcon, Building2Icon, StoreIcon, LandmarkIcon, FactoryIcon, GraduationCapIcon], text, index);

export const metricIcon = (text: string, index: number) =>
  resolve(METRIC_RULES, [ScaleIcon, MapPinIcon, WarehouseIcon, UsersIcon], text, index);

export const awarenessIcon = (text: string, index: number) =>
  resolve(AWARENESS_RULES, [SproutIcon, Building2Icon, MegaphoneIcon], text, index);
