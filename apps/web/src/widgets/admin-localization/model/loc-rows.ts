/**
 * Чистая логика над строками вкладки «Локализация», без сети. Загрузкой и отправкой PATCH
 * занимаются реестр источников и контейнер.
 */

export type LocSourceId = 'profile' | 'project' | 'experience' | 'education';

/** Одна строка таблицы соответствует одному локализуемому полю сущности. */
export interface LocRow {
  /** Формат: `${sourceId}:${entityId}:${fieldKey}`. */
  readonly id: string;
  readonly sectionId: string;
  readonly sectionLabel: string;
  /** Вместе с `entityId` и `fieldKey` определяет, куда уйдёт PATCH. */
  readonly sourceId: LocSourceId;
  readonly entityId: string;
  readonly fieldKey: string;
  /** Например, «Procharity · Заголовок». */
  readonly label: string;
  /** Значения в том виде, как пришли с сервера. */
  readonly ru: string;
  readonly en: string;
}

export type LocEdits = Readonly<Record<string, { readonly ru: string; readonly en: string }>>;

export function effective(row: LocRow, edits: LocEdits): { ru: string; en: string } {
  const edit = edits[row.id];
  return edit ? { ru: edit.ru, en: edit.en } : { ru: row.ru, en: row.en };
}

/** Правка, вернувшая исходное значение, изменением не считается. */
export function isChanged(row: LocRow, edits: LocEdits): boolean {
  const edit = edits[row.id];
  return edit !== undefined && (edit.ru !== row.ru || edit.en !== row.en);
}

export function isMissingEn(value: { en: string }): boolean {
  return value.en.trim() === '';
}

/** Совпадение с ru обычно значит, что текст скопировали, а перевести забыли. */
export function isSameAsRu(value: { ru: string; en: string }): boolean {
  return value.en.trim() !== '' && value.en.trim() === value.ru.trim();
}

export interface LocStats {
  readonly total: number;
  readonly translated: number;
  readonly missingEn: number;
  readonly sameAsRu: number;
  /** Процент переведённых строк, целое число. */
  readonly coverage: number;
}

export function computeStats(rows: readonly LocRow[], edits: LocEdits): LocStats {
  let missingEn = 0;
  let sameAsRu = 0;
  for (const row of rows) {
    const value = effective(row, edits);
    if (isMissingEn(value)) missingEn += 1;
    else if (isSameAsRu(value)) sameAsRu += 1;
  }
  const total = rows.length;
  const translated = total - missingEn - sameAsRu;
  const coverage = total === 0 ? 100 : Math.round((translated / total) * 100);
  return { total, translated, missingEn, sameAsRu, coverage };
}

export type LocFilter = 'all' | 'problems' | 'missing' | 'sameRu' | 'changed';

/** Поиск идёт сразу по подписи и обоим переводам. */
export function filterRows(
  rows: readonly LocRow[],
  edits: LocEdits,
  filter: LocFilter,
  query: string,
): LocRow[] {
  const needle = query.trim().toLowerCase();
  return rows.filter((row) => {
    const value = effective(row, edits);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'missing' && isMissingEn(value)) ||
      (filter === 'sameRu' && isSameAsRu(value)) ||
      (filter === 'problems' && (isMissingEn(value) || isSameAsRu(value))) ||
      (filter === 'changed' && isChanged(row, edits));
    if (!matchesFilter) return false;
    if (needle === '') return true;
    return (
      row.label.toLowerCase().includes(needle) ||
      value.ru.toLowerCase().includes(needle) ||
      value.en.toLowerCase().includes(needle)
    );
  });
}

export function changedRows(rows: readonly LocRow[], edits: LocEdits): LocRow[] {
  return rows.filter((row) => isChanged(row, edits));
}

export interface LocGroup {
  readonly id: string;
  readonly label: string;
  readonly rows: readonly LocRow[];
}

/** Секции идут в порядке первого появления. */
export function groupRows(rows: readonly LocRow[]): LocGroup[] {
  const order: string[] = [];
  const map = new Map<string, LocRow[]>();
  for (const row of rows) {
    const bucket = map.get(row.sectionId);
    if (bucket) {
      bucket.push(row);
    } else {
      order.push(row.sectionId);
      map.set(row.sectionId, [row]);
    }
  }
  return order.map((id) => {
    const groupRowsList = map.get(id) ?? [];
    return { id, label: groupRowsList[0]?.sectionLabel ?? '', rows: groupRowsList };
  });
}
