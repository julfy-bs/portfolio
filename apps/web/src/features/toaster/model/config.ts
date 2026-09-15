import type { ToastType } from '@sutuzhko/ui-kit';

/** Сколько тостов видно одновременно, новые вытесняют самые старые. */
export const MAX_TOASTS = 4;

/**
 * Длительность анимации ухода, мс. Должна совпадать с `--toast-exit` в
 * `toaster-view.module.css`, после неё тост удаляется из DOM.
 */
export const TOAST_EXIT_MS = 240;

/** Время автозакрытия по типу, мс. Ошибки висят дольше, их важнее прочитать. */
export const DEFAULT_DURATION: Record<ToastType, number> = {
  info: 5000,
  success: 5000,
  warning: 6500,
  error: 7000,
};
