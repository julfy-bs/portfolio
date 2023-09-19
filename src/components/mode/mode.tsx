import { FC, RefObject, useCallback, useEffect, useState } from 'react';

import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import Switch from '../ui/switch/switch';
import styles from './mode.module.scss';

type ModeProps = {
  themeRef: RefObject<HTMLDivElement>;
};

const Mode: FC<ModeProps> = ({ themeRef }) => {
  const [userTheme, setUserTheme] = useState<string>(localStorage.getItem('theme') || '');
  const [isUserPrefersDarkMode, setIsUserPrefersDarkMode] = useState<boolean>(false);
  const setTheme = useCallback(
    (theme: string) => {
      if (themeRef.current) {
        localStorage.setItem('theme', theme);
        setUserTheme(theme);
        const classList = themeRef?.current.classList;
        classList.remove('page_theme_dark', 'page_theme_light');
        classList.add(theme);
      }
    },
    [themeRef],
  );

  const toggleTheme = () => {
    userTheme === 'page_theme_light' ? setTheme('page_theme_dark') : setTheme('page_theme_light');
  };

  const setPreferenceTheme = useCallback((): void => {
    setIsUserPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isUserPrefersDarkMode) {
      setTheme('page_theme_dark');
    } else {
      setTheme('page_theme_light');
    }
  }, [isUserPrefersDarkMode, setTheme]);

  const setPresetTheme = useCallback(
    (presetTheme: string): void => {
      setTheme(presetTheme);
    },
    [setTheme],
  );

  const findAppearance = useCallback((): void => {
    userTheme === '' ? setPreferenceTheme() : setPresetTheme(userTheme);
  }, [setPreferenceTheme, setPresetTheme, userTheme]);

  useEffect(() => {
    findAppearance();
  }, [findAppearance]);

  return (
    <div className={styles.mode}>
      <Switch
        ariaLabel={'Переключить ночной режим'}
        icon={<SunIcon file-name="sun" />}
        iconChecked={<MoonIcon file-name="moon" />}
        switchCallback={toggleTheme}
        switched={userTheme === 'page_theme_dark'}
      />
    </div>
  );
};

export default Mode;
