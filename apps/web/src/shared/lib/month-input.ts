// Бэкенд хранит даты периодов (опыт, образование) как первое число месяца в UTC, а
// `<input type="month">` работает с YYYY-MM.

/** Если даты нет, отдаёт пустую строку, так поле останется пустым. */
export function isoToMonthInput(iso: string | null): string {
  return iso ? iso.slice(0, 7) : '';
}

export function monthInputToIso(month: string): string {
  return `${month}-01T00:00:00.000Z`;
}
