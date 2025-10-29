import { format, type Locale } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formats a Date object into a short readable format, e.g. "18 Oct 2025"
 * @param date - The date to format
 * @param locale - Optional locale (default: French)
 * @returns A formatted date string
 */
export function formatDate(
  date: Date | string | null | undefined,
  locale: Locale = fr,
): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "d MMM yyyy", { locale });
}
