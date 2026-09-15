import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styles from './tray.module.css';

const TRAY_ATTRIBUTE = 'data-tray-root';

/**
 * Один контейнер трея на страницу. Создаётся лениво и ищется по атрибуту, чтобы консоль и раннер
 * складывали пилюли в общий стек, а не перекрывали друг друга.
 */
function getTrayRoot(): HTMLElement {
  const existing = document.querySelector(`[${TRAY_ATTRIBUTE}]`);
  if (existing instanceof HTMLElement) {
    return existing;
  }
  const root = document.createElement('div');
  root.setAttribute(TRAY_ATTRIBUTE, '');
  root.className = styles.tray;
  document.body.appendChild(root);
  return root;
}

export interface TrayPortalProps {
  readonly children: ReactNode;
}

/**
 * Порталит свёрнутую пилюлю окна в общий трей. Корень берём в эффекте, а не при рендере,
 * чтобы не трогать DOM во время рендера и не падать там, где нет `document`.
 */
export function TrayPortal({ children }: TrayPortalProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(getTrayRoot());
  }, []);

  if (root === null) {
    return null;
  }
  return createPortal(children, root);
}
