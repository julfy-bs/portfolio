/**
 * Официальные цвета рангов Codewars. Это бренд-константы, а не дизайн-токены, поэтому
 * они лежат в конфиге виджета.
 */
const KYU_COLORS: Record<number, string> = {
  8: '#bcbfbf',
  7: '#bcbfbf',
  6: '#ecb613',
  5: '#ecb613',
  4: '#3c97e8',
  3: '#3c97e8',
  2: '#866cc7',
  1: '#866cc7',
};

const DEFAULT_KYU_COLOR = '#3c97e8';

/** 1 kyu самый высокий ранг. Для неизвестного ранга берём синий. */
export function kyuColor(kyu: number): string {
  return KYU_COLORS[kyu] ?? DEFAULT_KYU_COLOR;
}
