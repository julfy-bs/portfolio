import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/layout';
import { NotFoundPage } from '@/pages/not-found';
import { ServerErrorPage } from '@/pages/server-error';
import { routePaths } from '@/shared/config';

import { PageGate } from './page-gate';
import { RequireAuth } from './require-auth';

// Страницы грузятся лениво, каждая своим чанком. Лейаут нужен всегда, поэтому он в
// основном бандле.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        path: routePaths.home,
        lazy: async () => {
          const { HomePage } = await import('@/pages/home');
          return { Component: HomePage };
        },
      },
      {
        // Список и страница проекта скрываются вместе, одним флагом `showProjects`.
        element: <PageGate page="projects" />,
        children: [
          {
            path: routePaths.projects,
            lazy: async () => {
              const { ProjectsPage } = await import('@/pages/projects');
              return { Component: ProjectsPage };
            },
          },
          {
            path: routePaths.project,
            lazy: async () => {
              const { ProjectPage } = await import('@/pages/project');
              return { Component: ProjectPage };
            },
          },
        ],
      },
      {
        element: <PageGate page="experience" />,
        children: [
          {
            path: routePaths.experience,
            lazy: async () => {
              const { ExperiencePage } = await import('@/pages/experience');
              return { Component: ExperiencePage };
            },
          },
        ],
      },
      {
        element: <PageGate page="contact" />,
        children: [
          {
            path: routePaths.contact,
            lazy: async () => {
              const { ContactPage } = await import('@/pages/contact');
              return { Component: ContactPage };
            },
          },
        ],
      },
      {
        path: routePaths.login,
        lazy: async () => {
          const { LoginPage } = await import('@/pages/login');
          return { Component: LoginPage };
        },
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: routePaths.database,
            lazy: async () => {
              const { DatabasePage } = await import('@/pages/database');
              return { Component: DatabasePage };
            },
          },
          {
            // С голого `/admin` уводим на профиль в текущей локали.
            path: routePaths.admin,
            lazy: async () => {
              const { AdminIndexRedirect } = await import('@/pages/admin');
              return { Component: AdminIndexRedirect };
            },
          },
          {
            // `:detail` нужен редакторам отдельных записей: это id или `new`.
            path: `${routePaths.admin}/:tab/:locale/:detail?`,
            lazy: async () => {
              const { AdminPage } = await import('@/pages/admin');
              return { Component: AdminPage };
            },
          },
        ],
      },
      {
        // Не lazy: PageGate и так импортирует её напрямую, и отдельный чанк ничего не
        // даёт (Rollup ругался INEFFECTIVE_DYNAMIC_IMPORT).
        path: routePaths.notFound,
        Component: NotFoundPage,
      },
    ],
  },
]);
