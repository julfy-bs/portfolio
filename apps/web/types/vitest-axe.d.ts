import type { AxeMatchers } from 'vitest-axe/matchers';

// vitest-axe расширяет старый неймспейс `Vi`, а Vitest 4 берёт матчеры из своего
// Assertion, поэтому прокидываем их сюда вручную.
declare module 'vitest' {
  // Параметры типа должны совпадать с исходным Assertion<T = any>, иначе объявления не сольются.
  // eslint-disable-next-line -- файл вне src и линтером не проверяется, оставлено для ясности
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
