import { useEffect } from 'react';

// Секция становится текущей, когда её верх поднимается выше 35% высоты экрана.
const ACTIVE_LINE_RATIO = 0.35;
const BOTTOM_EPSILON = 2;

/**
 * Пишет текущую секцию в хэш URL. Внизу страницы активна последняя секция, потому что её
 * не докрутить до линии. Хэш меняем через `replaceState`, чтобы не засорять историю и не
 * вызывать навигацию роутера.
 */
export function useScrollSpy(sectionIds: readonly string[]): void {
  // Строка вместо массива, чтобы эффект не перезапускался на новом массиве с теми же id.
  const key = sectionIds.join('|');

  useEffect(() => {
    const ids = key ? key.split('|') : [];
    if (ids.length === 0) return;

    let frame = 0;

    const resolveActive = (): string => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const atBottom = scrollBottom >= document.documentElement.scrollHeight - BOTTOM_EPSILON;
      if (atBottom) return ids[ids.length - 1] ?? '';

      const line = window.innerHeight * ACTIVE_LINE_RATIO;
      let active = '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) active = id;
      }
      return active;
    };

    const sync = (): void => {
      frame = 0;
      const active = resolveActive();
      const { pathname, search, hash } = window.location;

      if (active) {
        const nextHash = `#${active}`;
        if (hash !== nextHash)
          window.history.replaceState(null, '', `${pathname}${search}${nextHash}`);
      } else if (hash) {
        // Вернулись наверх, хэш больше не нужен.
        window.history.replaceState(null, '', `${pathname}${search}`);
      }
    };

    const onScroll = (): void => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    sync();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);
}
