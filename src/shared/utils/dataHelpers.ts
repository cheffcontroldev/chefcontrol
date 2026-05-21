/**
 * Formats an ISO date string into a localized date or datetime string.
 * @param isoDate - ISO date string to format
 * @param format - Output format: 'date' (default), 'datetime', or 'time'
 * @param locale - Locale for formatting (default: 'es-ES')
 * @returns Formatted date string, or 'Fecha inválida' if the date is invalid
 * @example formatDate('2026-05-20', 'datetime') // '20/05/2026, 14:30'
 */
export function formatDate(
  isoDate: string,
  format: 'date' | 'datetime' | 'time' = 'date',
  locale: string = 'es-ES'
): string {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (format === 'datetime') {
    options.hour = '2-digit';
    options.minute = '2-digit';
  } else if (format === 'time') {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString(locale, options);
}

/**
 * Calculates the number of days until a given date.
 * @param date - Target date as string or Date object
 * @returns Number of days until the target (negative if in the past)
 * @example getDaysUntil('2026-05-25') // 5
 */
export function getDaysUntil(date: string | Date): number {
  const target = new Date(date);
  const today = new Date();

  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Checks if a date is expiring within the threshold.
 * @param date - Target date as string or Date object
 * @param thresholdDays - Number of days to consider as "soon" (default: 7)
 * @returns True if the date is within threshold and not yet expired
 * @example isExpiringSoon('2026-05-22') // true if today is 2026-05-20
 */
export function isExpiringSoon(date: string | Date, thresholdDays: number = 7): boolean {
  const days = getDaysUntil(date);
  return days <= thresholdDays && days >= 0;
}

/**
 * Checks if a date is in the past.
 * @param date - Target date as string or Date object
 * @returns True if the date has already passed
 * @example isExpired('2026-05-19') // true if today is 2026-05-20
 */
export function isExpired(date: string | Date): boolean {
  return getDaysUntil(date) < 0;
}

/**
 * Parses a date string in 'YYYY-MM-DD' format into a Date object.
 * @param dateString - Date string in 'YYYY-MM-DD' format, or null/undefined
 * @returns Date object, or null if input is null/undefined
 * @example parseLocalDate('2026-05-20') // Date(2026, 4, 20)
 */
export function parseLocalDate(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formats a date as a localized Colombian date string.
 * @param date - Date object or date string
 * @returns Formatted date string (dd/mm/yyyy), or '-' if invalid
 * @example formatDateDisplay(new Date('2026-05-20')) // '20/05/2026'
 */
export function formatDateDisplay(date: Date | string): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? parseLocalDate(new Date(date).toISOString()) : date;
  if (!d) return '-';

  return d.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Checks if a date string is today or in the future.
 * @param dateString - Date string in 'YYYY-MM-DD' format
 * @returns True if the date is today or later
 * @example isTodayOrFuture('2026-05-20') // true if today is 2026-05-20
 */
export function isTodayOrFuture(dateString: string): boolean {
  const selected = parseLocalDate(dateString);
  if (!selected) return false;

  selected.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected >= today;
}
