/**
 * Считает изменённые поля в `dirtyFields` из React Hook Form для счётчика в баре
 * сохранения. Структура там повторяет форму, поэтому обходим рекурсивно.
 */
export function countDirtyFields(dirty: unknown): number {
  if (dirty === true) return 1;
  if (Array.isArray(dirty)) {
    return dirty.reduce<number>((sum, item) => sum + countDirtyFields(item), 0);
  }
  if (dirty !== null && typeof dirty === 'object') {
    return Object.values(dirty).reduce<number>((sum, value) => sum + countDirtyFields(value), 0);
  }
  return 0;
}
