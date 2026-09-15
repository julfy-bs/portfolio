import { useTranslation } from 'react-i18next';

import type { AuthUser } from '@/entities/session';
import { Avatar, MenuItem } from '@sutuzhko/ui-kit';

import styles from './profile-menu.module.css';

export interface ProfileMenuViewProps {
  /** `undefined` для гостя. */
  readonly user: AuthUser | undefined;
  /** Аватар из профиля, до его загрузки undefined. */
  readonly avatarName?: string;
  readonly avatarPhotoUrl?: string | null;
  readonly avatarColor?: string | null;
  /** Пока идёт выход, повторно нажать нельзя. */
  readonly isSigningOut?: boolean;
  readonly onSignIn: () => void;
  /** Переход в базу знаний, основное действие меню. */
  readonly onOpenSection: () => void;
  readonly onOpenAdmin: () => void;
  readonly onSignOut: () => void;
}

/**
 * Возвращает только пункты без обёртки, потому что рендерится внутри меню навбара.
 * Аватар декоративный, имя стоит рядом текстом.
 */
export function ProfileMenuView({
  user,
  avatarName,
  avatarPhotoUrl,
  avatarColor,
  isSigningOut,
  onSignIn,
  onOpenSection,
  onOpenAdmin,
  onSignOut,
}: ProfileMenuViewProps) {
  const { t } = useTranslation();

  if (user === undefined) {
    return (
      <MenuItem icon="user" onClick={onSignIn}>
        {t('auth.signIn')}
      </MenuItem>
    );
  }

  return (
    <>
      <div className={styles.card}>
        <span aria-hidden="true">
          {/* Пока профиль не загрузился, показываем инициалы логина. */}
          <Avatar
            name={avatarName ?? user.username}
            src={avatarPhotoUrl ?? null}
            color={avatarColor ?? null}
            size={40}
          />
        </span>
        <div className={styles.cardText}>
          <span className={styles.label}>{t('auth.loggedInAs')}</span>
          <span className={styles.name}>{user.username}</span>
        </div>
      </div>
      <MenuItem icon="lock" primary onClick={onOpenSection}>
        {t('auth.openSection')}
      </MenuItem>
      <MenuItem icon="settings" bordered onClick={onOpenAdmin}>
        {t('auth.adminPanel')}
      </MenuItem>
      <MenuItem bordered disabled={isSigningOut} onClick={onSignOut}>
        {t('auth.signOut')}
      </MenuItem>
    </>
  );
}
