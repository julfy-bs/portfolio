import { useTranslation } from 'react-i18next';

import type { AvailabilityStatus } from '@/entities/profile';
import { cn } from '@/shared/lib';
import { Button, Skeleton } from '@sutuzhko/ui-kit';

import { AVAILABILITY_KEY } from '../model/config';

import styles from './open-to-work.module.css';

const noop = () => undefined;

export interface OpenToWorkProps {
  /** Статус из профиля. Пока его нет, показываем скелетон. */
  readonly availability?: AvailabilityStatus;
  readonly isLoading?: boolean;
  readonly onViewExperience?: () => void;
  /** false, если страница опыта выключена. */
  readonly showViewExperience?: boolean;
  /** Якорь секции для навигации и скролл-шпиона. */
  readonly id?: string;
  readonly className?: string;
}

/** Баннер «открыт к работе». Пока профиль грузится, на его месте скелетон той же высоты. */
export function OpenToWork({
  availability,
  isLoading,
  onViewExperience = noop,
  showViewExperience = true,
  id,
  className,
}: OpenToWorkProps) {
  const { t } = useTranslation();

  if (isLoading || !availability) {
    return <OpenToWorkSkeleton id={id} className={className} />;
  }

  const key = AVAILABILITY_KEY[availability];

  return (
    <section id={id} className={cn(styles.banner, className)} aria-label={t('home.now.label')}>
      <span className={cn(styles.dot, styles[key])} aria-hidden="true" />
      <div className={styles.body}>
        <p className={styles.title}>{t(`home.now.${key}.title`)}</p>
        <p className={styles.desc}>{t(`home.now.${key}.desc`)}</p>
      </div>
      {showViewExperience ? (
        <Button variant="ghost" className={styles.action} onClick={onViewExperience}>
          {t('home.now.btn')}
        </Button>
      ) : null}
    </section>
  );
}

function OpenToWorkSkeleton({
  id,
  className,
}: {
  readonly id?: string;
  readonly className?: string;
}) {
  return (
    <section id={id} className={cn(styles.banner, className)} aria-busy="true" aria-live="polite">
      <Skeleton width="var(--dot-size)" height="var(--dot-size)" radius="var(--radius-pill)" />
      {/* Заглушки повторяют заголовок и описание по высоте line-box, чтобы баннер
          не прыгал, когда придут данные. */}
      <div className={styles.skeletonBody}>
        <Skeleton width="190px" height="18px" />
        <Skeleton width="min(360px, 70%)" height="15px" />
      </div>
      <Skeleton width="150px" height="42px" radius="var(--radius-button)" />
    </section>
  );
}
