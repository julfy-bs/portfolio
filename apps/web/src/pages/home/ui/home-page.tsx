import { useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { useProjects } from '@/entities/project';
import { useGetSettingsQuery, usePageVisibility } from '@/entities/settings';
import { useGetCodewarsStatsQuery, useGetGithubStatsQuery } from '@/entities/stats';
import { useTechnologies } from '@/entities/technology';
import { projectPath, routePaths } from '@/shared/config';
import { downloadFile, useScrollSpy } from '@/shared/lib';
import { useConsole } from '@/widgets/console';

import { HomePageView } from './home-page-view';

// Якоря крупных секций, при скролле попадают в хэш URL. У баннера `now` тоже есть id
// для прямых ссылок, но в шпион он не входит: он короткий, и у низа страницы его
// перекрывает «featured».
const SECTION_IDS = ['about', 'stack', 'activity', 'featured'] as const;

export function HomePage() {
  const navigate = useNavigate();
  const { open: openConsole } = useConsole();
  const { data: profile, isLoading, isError, refetch } = useProfile();
  const github = useGetGithubStatsQuery();
  const codewars = useGetCodewarsStatsQuery();
  const projects = useProjects();
  const featured = projects.data?.filter((project) => project.pinned);
  const technologies = useTechnologies();
  const { data: settings } = useGetSettingsQuery();
  const pages = usePageVisibility();

  useScrollSpy(SECTION_IDS);

  return (
    <HomePageView
      profile={profile}
      githubStats={github.data}
      githubError={github.isError}
      codewarsStats={codewars.data}
      codewarsError={codewars.isError}
      featured={featured}
      technologies={technologies.data}
      sections={
        settings && {
          highlights: settings.showHighlights,
          about: settings.showAbout,
          stack: settings.showStack,
          activity: settings.showActivity,
          now: settings.showNow,
          featured: settings.showFeatured,
        }
      }
      pages={pages}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      onDownloadCv={() => downloadFile(profile?.cvUrl)}
      onOpenConsole={openConsole}
      onOpenProjects={() => void navigate(routePaths.projects)}
      onOpenProject={(slug) => void navigate(projectPath(slug))}
      onViewExperience={() => void navigate(routePaths.experience)}
      onContact={() => void navigate(routePaths.contact)}
    />
  );
}
