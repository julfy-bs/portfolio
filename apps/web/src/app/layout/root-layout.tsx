import { useCallback, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { useProjects } from '@/entities/project';
import { useGetSettingsQuery } from '@/entities/settings';
import { ProfileMenu, ProfileMenuTrigger } from '@/features/profile-menu';
import { themeStorageKey, useTheme } from '@/features/theme-switch';
import { Console, useConsole } from '@/widgets/console';
import { Footer } from '@/widgets/footer';
import { Navbar } from '@/widgets/navbar';
import { Runner, useRunner } from '@/widgets/runner';

import styles from './root-layout.module.css';

/**
 * При переходе по хэшу скроллит к секции, при смене страницы возвращает наверх. На первом
 * рендере ничего не делает, позицию после перезагрузки восстановит браузер. Скролл-шпион
 * меняет хэш через `replaceState` в обход роутера, так что сюда эти изменения не доходят.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const isInitial = useRef(true);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: isInitial.current ? 'auto' : 'smooth' });
        isInitial.current = false;
        return;
      }
    }

    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}

// Каждая страница рендерит свой `<main>`, поэтому здесь его нет.
export function RootLayout() {
  const { open } = useConsole();
  // Виджеты не знают друг о друге, консоль с раннером связываем здесь, на уровне app.
  const { open: openRunner } = useRunner();
  const { data: profile } = useProfile();
  // Нужны консоли, чтобы по команде `run <cmd>` найти проект.
  const { data: projects } = useProjects();
  // Пока настройки не пришли, навбар показывает свой логотип по умолчанию.
  const { data: settings } = useGetSettingsQuery();

  // Акцент один на всех посетителей и задаётся в кабинете. Темой занимается
  // ThemeProvider отдельно.
  const accentColor = settings?.accentColor;
  useEffect(() => {
    if (accentColor) document.documentElement.dataset.accent = accentColor;
  }, [accentColor]);

  // Тема из настроек нужна только новому гостю. Если он уже выбирал тему или у системы
  // есть предпочтение, их применил бутстрап-скрипт, и они важнее.
  const { mode, applyDefaultMode } = useTheme();
  const defaultTheme = settings?.defaultTheme;
  useEffect(() => {
    if (defaultTheme !== 'dark' && defaultTheme !== 'light') return;
    const hasChoice = ((): boolean => {
      try {
        const stored = localStorage.getItem(themeStorageKey);
        return stored === 'dark' || stored === 'light';
      } catch {
        return false;
      }
    })();
    if (hasChoice) return;
    const hasSystemPreference =
      window.matchMedia('(prefers-color-scheme: dark)').matches ||
      window.matchMedia('(prefers-color-scheme: light)').matches;
    if (hasSystemPreference) return;
    if (defaultTheme !== mode) applyDefaultMode(defaultTheme);
  }, [defaultTheme, mode, applyDefaultMode]);

  // Возвращает название запущенного проекта или null, если такой команды нет.
  const runProject = useCallback(
    (command: string): string | null => {
      const match = projects?.find(
        (project) =>
          project.runnable && project.embedUrl !== null && project.runCommand === command,
      );
      if (match === undefined || match.embedUrl === null) return null;
      openRunner({ title: match.title, embedUrl: match.embedUrl });
      return match.title;
    },
    [projects, openRunner],
  );

  return (
    <div className={styles.shell}>
      <ScrollManager />
      <Navbar
        onOpenConsole={open}
        brand={settings?.siteTitle}
        profileMenu={<ProfileMenu />}
        profileTrigger={<ProfileMenuTrigger />}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer owner={profile?.name} />
      <Console onRunProject={runProject} />
      <Runner />
    </div>
  );
}
