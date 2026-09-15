import type { AppLanguage } from '@/shared/config';

/**
 * Даты хранятся первым числом месяца в UTC. Форматируем тоже в UTC, иначе западнее
 * Гринвича месяц съезжает на предыдущий.
 * @param openEndLabel подпись вместо даты окончания, например «наст. время». Если её нет,
 * а период не закрыт, выводим только начало.
 */
export function formatMonthRange(
  startDate: string,
  endDate: string | null,
  language: AppLanguage,
  openEndLabel?: string,
): string {
  const format = new Intl.DateTimeFormat(language, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const start = format.format(new Date(startDate));
  if (endDate !== null) return `${start} — ${format.format(new Date(endDate))}`;
  return openEndLabel === undefined ? start : `${start} — ${openEndLabel}`;
}
