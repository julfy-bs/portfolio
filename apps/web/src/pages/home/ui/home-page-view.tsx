import { useTranslation } from 'react-i18next';

import type { Profile } from '@/entities/profile';
import type { ProjectListItem } from '@/entities/project';
import type { PageVisibility } from '@/entities/settings';
import type { CodewarsStats, GithubStats } from '@/entities/stats';
import type { Technology } from '@/entities/technology';
import { useReveal } from '@/shared/lib';
import { ErrorState } from '@sutuzhko/ui-kit';
import { About } from '@/widgets/about';
import { Activity } from '@/widgets/activity';
import { Featured } from '@/widgets/featured';
import { Hero } from '@/widgets/hero';
import { Highlights } from '@/widgets/highlights';
import { OpenToWork } from '@/widgets/open-to-work';
import { Stack } from '@/widgets/stack';

import styles from './home-page.module.css';

const noop = () => undefined;

/**
 * Секция скрыта только при `false`, без флага она видна. Hero выключить нельзя,
 * без него главная теряет смысл.
 */
export interface HomeSectionVisibility {
  readonly highlights?: boolean;
  readonly about?: boolean;
  readonly stack?: boolean;
  readonly activity?: boolean;
  readonly now?: boolean;
  readonly featured?: boolean;
}

export interface HomePageViewProps {
  readonly profile?: Profile;
  readonly githubStats?: GithubStats;
  readonly githubError?: boolean;
  readonly codewarsStats?: CodewarsStats;
  readonly codewarsError?: boolean;
  /** Закреплённые проекты для «Избранного». */
  readonly featured?: readonly ProjectListItem[];
  /** Технологии стека (с категориями) для секции «Стек». */
  readonly technologies?: readonly Technology[];
  /** Из настроек сайта, по умолчанию видны все секции. */
  readonly sections?: HomeSectionVisibility;
  /** Нужна, чтобы скрыть CTA, ведущие на выключенные страницы. */
  readonly pages?: PageVisibility;
  /** Пока профиль грузится, секции с его данными под скелетоном. */
  readonly isLoading?: boolean;
  readonly isError?: boolean;
  readonly onRetry?: () => void;
  readonly onDownloadCv?: () => void;
  readonly onOpenConsole?: () => void;
  readonly onOpenProjects?: () => void;
  /** Открыть страницу детали проекта по slug (клик по избранной плитке). */
  readonly onOpenProject?: (slug: string) => void;
  readonly onViewExperience?: () => void;
  readonly onContact?: () => void;
}

export function HomePageView({
  profile,
  githubStats,
  githubError,
  codewarsStats,
  codewarsError,
  featured,
  technologies,
  sections,
  pages,
  isLoading,
  isError,
  onRetry = noop,
  onDownloadCv = noop,
  onOpenConsole = noop,
  onOpenProjects = noop,
  onOpenProject = noop,
  onViewExperience = noop,
  onContact = noop,
}: HomePageViewProps) {
  const { t } = useTranslation();
  const revealRef = useReveal();

  if (isError) {
    return (
      <main id="main" className={styles.page}>
        <ErrorState message={t('home.error')} retryLabel={t('home.retry')} onRetry={onRetry} />
      </main>
    );
  }

  return (
    <main id="main" className={styles.page} ref={revealRef}>
      <Hero
        profile={profile}
        isLoading={isLoading}
        onOpenConsole={onOpenConsole}
        onDownloadCv={onDownloadCv}
        onProjects={onOpenProjects}
        onContact={onContact}
        showProjects={pages?.projects !== false}
        showContact={pages?.contact !== false}
      />
      {sections?.highlights !== false ? (
        <Highlights items={profile?.highlights} isLoading={isLoading} />
      ) : null}
      {sections?.about !== false ? (
        <About id="about" bioMarkdown={profile?.bioMarkdown} isLoading={isLoading} />
      ) : null}
      {sections?.stack !== false ? (
        <Stack id="stack" technologies={technologies} isLoading={isLoading} />
      ) : null}
      {/* Пока грузится профиль, статистику тоже держим в скелетоне, чтобы страница
          не загружалась по кускам. */}
      {sections?.activity !== false ? (
        <Activity
          id="activity"
          github={isLoading ? undefined : githubStats}
          githubError={githubError}
          codewars={isLoading ? undefined : codewarsStats}
          codewarsError={codewarsError}
        />
      ) : null}
      {sections?.now !== false ? (
        <OpenToWork
          id="now"
          availability={profile?.availability}
          isLoading={isLoading}
          onViewExperience={onViewExperience}
          showViewExperience={pages?.experience !== false}
        />
      ) : null}
      {/* И «Все проекты», и плитки ведут на страницы проектов. Если проекты выключены,
          таких ссылок быть не должно, поэтому блок скрываем. */}
      {sections?.featured !== false && pages?.projects !== false ? (
        <Featured
          id="featured"
          projects={featured}
          isLoading={isLoading}
          onViewAll={onOpenProjects}
          onSelect={onOpenProject}
        />
      ) : null}
    </main>
  );
}
