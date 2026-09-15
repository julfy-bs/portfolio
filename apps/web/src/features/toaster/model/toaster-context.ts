import { createContext, useContext } from 'react';

import type { ToastType } from '@sutuzhko/ui-kit';

/** Обязателен только заголовок, остальное берётся по умолчанию. */
export interface ToastOptions {
  readonly type?: ToastType;
  readonly title: string;
  readonly description?: string;
  /** Время до автозакрытия, мс. `0` не закрывает, по умолчанию зависит от типа. */
  readonly duration?: number;
}

export interface ToasterContextValue {
  /** Возвращает id тоста для ручного `dismiss`. */
  readonly notify: (options: ToastOptions) => number;
  /** Обычно хватает автозакрытия и крестика. */
  readonly dismiss: (id: number) => void;
}

export const ToasterContext = createContext<ToasterContextValue | null>(null);

/** Вне ToasterProvider бросает ошибку: значит, провайдер забыли подключить. */
export function useToaster(): ToasterContextValue {
  const value = useContext(ToasterContext);
  if (value === null) {
    throw new Error('useToaster должен использоваться внутри ToasterProvider');
  }
  return value;
}
