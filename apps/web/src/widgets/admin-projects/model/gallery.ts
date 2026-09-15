/** Лимиты должны совпадать с бэком, см. `media.service` и `media.controller`. */
export const MAX_GALLERY_ITEMS = 10;
export const MAX_GALLERY_FILE_SIZE = 8 * 1024 * 1024; // 8 МБ, как `MAX_FILE_SIZE` на бэке

export interface GalleryPickResult {
  /** Эти файлы и загружаем. */
  readonly accepted: readonly File[];
  readonly tooLarge: readonly File[];
  /** По размеру подходят, но места в галерее на них не хватило. */
  readonly overflow: readonly File[];
}

/** Сначала отсеиваем слишком большие файлы, чтобы они не занимали место под лимит. */
export function partitionGalleryFiles(
  files: readonly File[],
  currentCount: number,
  maxItems: number = MAX_GALLERY_ITEMS,
  maxSize: number = MAX_GALLERY_FILE_SIZE,
): GalleryPickResult {
  const remaining = Math.max(0, maxItems - currentCount);
  const tooLarge: File[] = [];
  const withinSize: File[] = [];
  for (const file of files) {
    if (file.size > maxSize) tooLarge.push(file);
    else withinSize.push(file);
  }
  return {
    accepted: withinSize.slice(0, remaining),
    overflow: withinSize.slice(remaining),
    tooLarge,
  };
}
