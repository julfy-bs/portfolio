export type ClassValue = string | false | null | undefined;

/** Склеивает классы, пропуская пустые и ложные значения. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
