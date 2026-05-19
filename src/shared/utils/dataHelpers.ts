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

export function getDaysUntil(date: string | Date): number {
  const target = new Date(date);
  const today = new Date();

  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(date: string | Date, thresholdDays: number = 7): boolean {
  const days = getDaysUntil(date);
  return days <= thresholdDays && days >= 0;
}

export function isExpired(date: string | Date): boolean {
  return getDaysUntil(date) < 0;
}

export function parseLocalDate(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

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

export function isTodayOrFuture(dateString: string): boolean {
  const selected = parseLocalDate(dateString);
  selected.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected >= today;
}
