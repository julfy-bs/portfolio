// Внешние API падают и режут по лимитам, поэтому храним последний удачный ответ.
// Пока он свежий, отдаём его без запроса, а устаревший выручает, когда источник лежит.
export class TtlCache<T> {
  private entry: { value: T; expiresAt: number } | null = null;

  constructor(private readonly ttlMs: number) {}

  getFresh(): T | null {
    if (!this.entry) return null;
    return Date.now() <= this.entry.expiresAt ? this.entry.value : null;
  }

  // Срок не проверяем, это запасной вариант на случай сбоя внешнего API.
  getStale(): T | null {
    return this.entry?.value ?? null;
  }

  set(value: T): void {
    this.entry = { value, expiresAt: Date.now() + this.ttlMs };
  }
}
