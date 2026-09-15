import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);

// В jsdom нет ResizeObserver, а компонентам, которые меряют раскладку, хватает пустой заглушки.
class ResizeObserverStub implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

// В jsdom нет matchMedia. Считаем, что тесты идут на десктопе с клавиатурой.
window.matchMedia = (query: string): MediaQueryList =>
  ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList;

// В jsdom нет object URL, а ImageCropper строит через него превью выбранного файла.
if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = () => 'blob:mock';
  URL.revokeObjectURL = () => {};
}

afterEach(() => {
  cleanup();
});
