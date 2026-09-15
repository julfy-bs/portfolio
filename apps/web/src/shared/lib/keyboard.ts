import { useEffect, useState } from 'react';

// Напрямую клавиатуру не определить, поэтому судим по точному указателю с hover.
// У телефонов и планшетов указатель грубый и hover нет.
const KEYBOARD_QUERY = '(hover: hover) and (pointer: fine)';

/** Нужен, чтобы не показывать подсказки хоткеев на тач-устройствах. */
export function useHasKeyboard(): boolean {
  const [hasKeyboard, setHasKeyboard] = useState(() => window.matchMedia(KEYBOARD_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(KEYBOARD_QUERY);
    const update = (): void => setHasKeyboard(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return hasKeyboard;
}

export function consoleShortcut(): string {
  return /mac/i.test(navigator.platform) ? '⌘K' : 'Ctrl+K';
}
