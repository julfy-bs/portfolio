import { FC, RefObject, useCallback, useEffect, useState } from 'react';

import { ReactComponent as MoonIcon } from '../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { DarkMode, MODE_DARK_CLASS, MODE_LOCAL_STORAGE_KEY } from '../../constants/mode';
import Switcher from '../ui/switcher/switcher';
import styles from './mode.module.scss';

/**
 * Тип входных параметров для компонента Mode.
 * @memberof Mode
 * @alias ModeProps
 * @typedef {ModeProps} ModeProps
 */
type ModeProps = {
  /**
   * Ref элемента-обертки на который вешается класс для применения стилей темной темы
   * */
  themeRef: RefObject<HTMLDivElement>;
};

/**
 * Компонент смены темы приложения. При вызове требуется обязательный параметр - элемент-родитель, на который будет вешаться класс темной темы.
 *
 * @component
 * @name Mode
 * @param {RefObject<HTMLDivElement>} themeRef Ref элемента-обертки на который вешается класс для применения стилей темной темы.
 * @example Пример использования компонента Mode.
 * * const ref = useRef<HTMLElement | null>(null);
 * * return (
 * *  <Mode themeRef={ref} />
 * * )
 */
const Mode: FC<ModeProps> = ({ themeRef }) => {
  const [localStorageModeValue, setLocalStorageModeValue] = useState<string>(
    localStorage.getItem(MODE_LOCAL_STORAGE_KEY) || DarkMode.NULL,
  );

  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(localStorageModeValue === DarkMode.TRUE);

  const [isUserPrefersDarkMode, setIsUserPrefersDarkMode] = useState<boolean>(false);

  /**
   * @method
   * @name setMode
   * @description Функция включения нужной темы сайта. Создает флаг в local storage для включения нужной темы при следующем заходе на сайт.
   * @memberof Mode
   * @param {DarkMode} mode тема, которую необходимо включить.
   * */
  const setMode = useCallback(
    (mode: DarkMode) => {
      if (themeRef.current) {
        const classList = themeRef?.current.classList;
        if (mode === DarkMode.TRUE) {
          setIsDarkModeActive(true);
          localStorage.setItem(MODE_LOCAL_STORAGE_KEY, DarkMode.TRUE);
          setLocalStorageModeValue(DarkMode.TRUE);
          classList.add(MODE_DARK_CLASS);
        } else {
          setIsDarkModeActive(false);
          localStorage.setItem(MODE_LOCAL_STORAGE_KEY, DarkMode.FALSE);
          setLocalStorageModeValue(DarkMode.FALSE);
          classList.remove(MODE_DARK_CLASS);
        }
      }
    },
    [themeRef],
  );

  /**
   * @method
   * @name toggleTheme
   * @memberof Mode
   * @description Функция переключения темы сайта. Переключает текущую тему на противоположную.
   * Доступные темы: темная, светлая. {@link DarkMode}
   * @example
   * * isDarkModeActive === true
   * * toggleTheme(); => setMode(DarkMode.FALSE);
   * *
   * * isDarkModeActive === false
   * * toggleTheme(); => setMode(DarkMode.TRUE);
   * */
  const toggleTheme = useCallback(() => {
    isDarkModeActive ? setMode(DarkMode.FALSE) : setMode(DarkMode.TRUE);
  }, [isDarkModeActive, setMode]);

  /**
   * @method
   * @name setPreferenceTheme
   * @memberof Mode
   * @description Вспомогательная функция для поиска предпочитаемой темы пользователя. С помощью объекта window и его метода matchMedia находит и устанавливает предпочитаемую тему пользователя.
   * */
  const setPreferenceTheme = useCallback((): void => {
    setIsUserPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isUserPrefersDarkMode) {
      setMode(DarkMode.TRUE);
    } else {
      setMode(DarkMode.FALSE);
    }
  }, [isUserPrefersDarkMode, setMode]);

  /**
   * @function
   * @name findAppearance
   * @memberof Mode
   * @description Вспомогательная функция для выбора темы сайта при загрузке страницы. Проверяет, хранится ли значение в локальном хранилище пользователя.
   * Если значение не найдено - устанавливает стандартную тему устройства пользователя.
   * Если значение найдено - устанавливает тему на основе найденного значения.
   * */
  const findAppearance = useCallback((): void => {
    if (localStorageModeValue === DarkMode.NULL) {
      setPreferenceTheme();
    } else if (localStorageModeValue === DarkMode.TRUE) {
      setMode(DarkMode.TRUE);
    } else {
      setMode(DarkMode.FALSE);
    }
  }, [localStorageModeValue, setMode, setPreferenceTheme]);

  useEffect(() => {
    findAppearance();
    /* Необходим только один вызов функции для определения предпочтений пользователя */
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.mode}>
      <Switcher
        ariaLabel={'Переключить ночной режим'}
        icon={<SunIcon file-name="sun" />}
        iconChecked={<MoonIcon file-name="moon" />}
        switchCallback={toggleTheme}
        switched={isDarkModeActive}
      />
      <Switcher
        ariaLabel={'Кнопка без смены темы'}
        icon={<span>1</span>}
        iconChecked={<span>2</span>}
        switchCallback={() => console.log(123)}
        switched={false}
      />
      <Switcher
        ariaLabel={'Кнопка без смены темы'}
        icon={<span>1</span>}
        iconChecked={<span>2</span>}
        switchCallback={() => console.log(123)}
        switched={false}
      />
    </div>
  );
};

export default Mode;
