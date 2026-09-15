import type { AxeMatchers } from 'vitest-axe/matchers';

// vitest-axe расширяет старый namespace `Vi`, а Vitest 4 берёт матчеры из собственного
// интерфейса Assertion, поэтому связываем их здесь.
declare module 'vitest' {
  // Список параметров типа обязан совпадать с базовым Assertion<T = any> из vitest.
  // eslint-disable-next-line -- файл вне src и линтером не проверяется, оставлено для ясности
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
