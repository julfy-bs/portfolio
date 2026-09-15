import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LangSwitch } from '@/features/lang-switch';
import { ThemeSwitch } from '@/features/theme-switch';
import { cn } from '@/shared/lib';
import { routePaths } from '@/shared/config';
import { Button, Icon, Menu } from '@sutuzhko/ui-kit';

import { BRAND_NAME, CONSOLE_GLYPH } from '../model/config';

import styles from './navbar.module.css';

export interface NavbarProps {
  /** Логика открытия консоли живёт выше, здесь только кнопка. */
  readonly onOpenConsole: () => void;
  /**
   * Текст логотипа из настроек сайта (`siteTitle`), его можно менять в кабинете.
   * Пока настройки грузятся, показываем `BRAND_NAME`.
   */
  readonly brand?: string;
  /**
   * Если пункты заданы, клик по профилю открывает меню, иначе вызывается `onProfileClick`.
   * Содержимое зависит от авторизации, поэтому приходит из приватной зоны.
   */
  readonly profileMenu?: ReactNode;
  /**
   * Аватар вошедшего пользователя, без него рисуется общая иконка. Приходит снаружи,
   * чтобы навбар ничего не знал об авторизации.
   */
  readonly profileTrigger?: ReactNode;
  /** Клик по профилю, когда меню не задано. */
  readonly onProfileClick?: () => void;
  readonly className?: string;
}

/**
 * Верхняя панель: консоль слева, бренд по центру, тема, язык и профиль справа.
 * На экранах уже 480px бренд скрывается, ему не хватает места между кнопками.
 */
export function Navbar({
  onOpenConsole,
  brand = BRAND_NAME,
  profileMenu,
  profileTrigger,
  onProfileClick,
  className,
}: NavbarProps) {
  const { t } = useTranslation();

  return (
    <header className={cn(styles.navbar, className)}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Button
            variant="icon"
            onClick={onOpenConsole}
            aria-label={t('nav.openConsole')}
            className={styles.console}
          >
            {CONSOLE_GLYPH}
          </Button>
        </div>

        {/* В доступном имени есть видимый бренд, а скобки скрыты от скринридеров.
            Иначе ловим label-content-name-mismatch (WCAG 2.5.3). */}
        <Link
          to={routePaths.home}
          aria-label={`${brand} — ${t('nav.home')}`}
          className={styles.brand}
        >
          <span className={styles.brandDim} aria-hidden>
            &lt;
          </span>
          {brand}
          <span className={styles.brandDim} aria-hidden>
            {' '}
            /&gt;
          </span>
        </Link>

        <div className={styles.right}>
          <ThemeSwitch />
          <LangSwitch />
          {profileMenu ? (
            <Menu
              align="end"
              ariaLabel={t('nav.profileMenu')}
              renderTrigger={({ toggle, triggerProps }) => (
                <Button
                  variant="icon"
                  onClick={toggle}
                  aria-label={t('nav.profileMenu')}
                  // Аватар заполняет кнопку, поэтому обрезаем его по её форме.
                  className={styles.profileTrigger}
                  {...triggerProps}
                >
                  {profileTrigger ?? <Icon name="user" size={18} />}
                </Button>
              )}
            >
              {profileMenu}
            </Menu>
          ) : (
            <Button variant="icon" onClick={onProfileClick} aria-label={t('nav.profileMenu')}>
              <Icon name="user" size={18} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
