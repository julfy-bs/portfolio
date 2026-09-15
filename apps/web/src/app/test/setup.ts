import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

import { resetMockContributors } from '@/entities/contributor/mocks';
import { resetMockEducation } from '@/entities/education/mocks';
import { resetMockExperience } from '@/entities/experience/mocks';
import { resetMockLanguages } from '@/entities/language/mocks';
import { resetMockProjects } from '@/entities/project/mocks';
import { resetMockProfileAdmin } from '@/entities/profile/mocks';
import { resetMockSession } from '@/entities/session/mocks';
import { resetMockSettings } from '@/entities/settings/mocks';
import { resetMockSkills } from '@/entities/skill/mocks';
import { resetMockTechnologies } from '@/entities/technology/mocks';
import { i18n, languageStorageKey } from '@/shared/config';

import { server } from '../mocks/server';

expect.extend(axeMatchers);

// В jsdom нет ResizeObserver, а на нём держится замер тегов в featured-карточках.
class ResizeObserverStub implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

// В jsdom нет matchMedia. Отвечаем true на всё, как на десктопе с клавиатурой.
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

// От платформы зависит подпись хоткея консоли, фиксируем Mac.
Object.defineProperty(navigator, 'platform', { value: 'MacIntel', configurable: true });

// В jsdom нет object URL, а он нужен превью при кадрировании аватара.
if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = () => 'blob:mock';
  URL.revokeObjectURL = () => {};
}

// В jsdom navigator отдаёт en, поэтому ставим ru до инициализации детектора языка.
localStorage.setItem(languageStorageKey, 'ru');

// Запрос без обработчика валит тест, чтобы не пропустить забытый мок.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  resetMockSession();
  resetMockProfileAdmin();
  resetMockSettings();
  resetMockTechnologies();
  resetMockSkills();
  resetMockLanguages();
  resetMockEducation();
  resetMockExperience();
  resetMockProjects();
  resetMockContributors();
  cleanup();
  // Возвращаем ru после тестов, которые переключали язык. Часть UI-тестов рендерит
  // без провайдера, и i18n там может быть не инициализирован.
  if (i18n.isInitialized && i18n.resolvedLanguage !== 'ru') {
    void i18n.changeLanguage('ru');
  }
  // Хэш мог остаться от скролл-шпиона.
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname);
  }
});

afterAll(() => {
  server.close();
});
