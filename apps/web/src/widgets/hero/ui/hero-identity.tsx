import { useTranslation } from 'react-i18next';

import { telegramHandle, type Profile } from '@/entities/profile';
import { Avatar, Heading, Skeleton, Text } from '@sutuzhko/ui-kit';

import { HERO_AVATAR_SIZE } from '../model/config';

import styles from './hero.module.css';

/** Аватар, приветствие, имя и роль. Ник берём из Telegram в контактах профиля. */
export function HeroIdentity({ profile }: { readonly profile: Profile }) {
  const { t } = useTranslation();
  const handle = telegramHandle(profile.contacts);

  return (
    <div className={styles.identity}>
      <Avatar
        name={profile.name}
        src={profile.avatarPhotoUrl}
        color={profile.avatarColor}
        size={HERO_AVATAR_SIZE}
      />
      <div className={styles.titles}>
        <Text family="mono" size="caption" tone="primary">
          {t('home.hero.greeting')}
        </Text>
        <Heading level="h1">{profile.name}</Heading>
        <Text as="span" family="mono" size="small" tone="muted">
          {handle ? (
            <>
              {handle} <span className={styles.sep}>·</span>{' '}
            </>
          ) : null}
          {profile.roleTitle}
        </Text>
      </div>
    </div>
  );
}

/** Высоты повторяют line-box текста (caption 18, h1 41, small 20), чтобы блок не прыгал,
 * когда придут данные. */
export function HeroIdentitySkeleton() {
  return (
    <div className={styles.identity}>
      <Skeleton
        width={`${String(HERO_AVATAR_SIZE)}px`}
        height={`${String(HERO_AVATAR_SIZE)}px`}
        radius="var(--radius-pill)"
      />
      <div className={styles.titles}>
        <Skeleton width="120px" height="18px" />
        <Skeleton width="280px" height="41px" />
        <Skeleton width="230px" height="20px" />
      </div>
    </div>
  );
}
