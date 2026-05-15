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
