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

export const ACCENTS: Record<"teal" | "slate" | "lime" | "deep" | "sand", Accent> = {
  teal: {
    soft: "bg-[#DBEEE8]",
    ring: "border-[#62AF9D]/45",
    chip: "bg-[#62AF9D]/25 text-[#2f6558]",
    text: "text-[#2f6558]",
    solid: "bg-[#62AF9D] text-[#111111]",
    hex: "#62AF9D",
  },
  slate: {
    soft: "bg-[#DDE6EE]",
    ring: "border-[#465F74]/40",
    chip: "bg-[#465F74]/20 text-[#3a4f61]",
    text: "text-[#3a4f61]",
    solid: "bg-[#465F74] text-white",
    hex: "#465F74",
  },
  lime: {
    soft: "bg-[#E1F2DC]",
    ring: "border-[#7EC67E]/55",
    chip: "bg-[#7EC67E]/32 text-[#40803f]",
    text: "text-[#40803f]",
    solid: "bg-[#7EC67E] text-[#111111]",
    hex: "#7EC67E",
  },
  deep: {
    soft: "bg-[#D9E5E1]",
    ring: "border-[#0d2b24]/30",
    chip: "bg-[#0d2b24]/18 text-[#0d2b24]",
    text: "text-[#0d2b24]",
    solid: "bg-[#0d2b24] text-white",
    hex: "#0D2B24",
  },
  sand: {
    soft: "bg-[#FAF8F3]",
    ring: "border-black/[0.08]",
    chip: "bg-[#111111]/8 text-[#111111]",
    text: "text-[#111111]/70",
    solid: "bg-[#111111] text-white",
    hex: "#FAF8F3",
  },
};

/** Rotation used wherever a list of equal-weight cards needs colour. */
export const ACCENT_CYCLE: Accent[] = [
  ACCENTS.teal,
  ACCENTS.slate,
  ACCENTS.lime,
  ACCENTS.deep,
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
