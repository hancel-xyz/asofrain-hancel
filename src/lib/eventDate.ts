const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function parseEventDate(value: string): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const d = new Date(`${value}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}

/** "2026-03-08" -> "08 MAR". Falls back to the raw value for legacy, non-ISO entries. */
export function formatEventDateLabel(value: string): string {
  const d = parseEventDate(value);
  if (!d) return value;
  return `${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]}`;
}

/** Returns the calendar year for a real ISO date, or null for legacy/free-text values. */
export function getEventYear(value: string): number | null {
  const d = parseEventDate(value);
  return d ? d.getFullYear() : null;
}
