export interface OrderedItem {
  readonly key: string;
  /** null у ещё не сохранённой записи. */
  readonly id: string | null;
  readonly order: number;
}

/**
 * Считает новый `order` для последовательности так, чтобы изменилось как можно меньше
 * записей. Самая длинная возрастающая подпоследовательность остаётся на месте, остальные
 * получают дробную позицию между соседями. Поэтому перенос одного элемента меняет только
 * его `order`, и на бэке это поле Float.
 */
export function planMinimalOrders(seq: readonly OrderedItem[]): Map<string, number> {
  const existing: number[] = [];
  for (let i = 0; i < seq.length; i += 1) {
    if (seq[i].id !== null) existing.push(i);
  }

  // LIS по `order` среди сохранённых записей, строго возрастающая.
  const anchors = new Set<number>();
  if (existing.length > 0) {
    const length = existing.map(() => 1);
    const parent = existing.map(() => -1);
    let best = 0;
    for (let a = 0; a < existing.length; a += 1) {
      for (let b = 0; b < a; b += 1) {
        if (seq[existing[b]].order < seq[existing[a]].order && length[b] + 1 > length[a]) {
          length[a] = length[b] + 1;
          parent[a] = b;
        }
      }
      if (length[a] > length[best]) best = a;
    }
    for (let k = best; k !== -1; k = parent[k]) anchors.add(existing[k]);
  }

  const plan = new Map<string, number>();
  let i = 0;
  while (i < seq.length) {
    if (anchors.has(i)) {
      plan.set(seq[i].key, seq[i].order);
      i += 1;
      continue;
    }
    // Отрезок [i, j) без якорей. По краям от него якоря или конец списка.
    let j = i;
    while (j < seq.length && !anchors.has(j)) j += 1;
    const lo = i > 0 ? seq[i - 1].order : null;
    const hi = j < seq.length ? seq[j].order : null;
    const run = j - i;
    for (let r = 0; r < run; r += 1) {
      let value: number;
      if (lo === null && hi === null) value = r;
      else if (lo === null)
        value = hi - (run - r); // ниже hi, по возрастанию
      else if (hi === null)
        value = lo + (r + 1); // выше lo
      else value = lo + ((hi - lo) * (r + 1)) / (run + 1); // равномерно между соседями
      plan.set(seq[i + r].key, value);
    }
    i = j;
  }
  return plan;
}
