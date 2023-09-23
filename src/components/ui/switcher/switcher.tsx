import { clsx } from 'clsx';
import { EventHandler, FC, ReactNode, SyntheticEvent, useCallback, useState } from 'react';

import {
  BUTTON_SWITCH_TEST_ID,
  ICON_CHECKED_TEST_ID,
  ICON_UNCHECKED_TEST_ID,
} from '../../../constants/tests/switch/values';
import styles from './switcher.module.scss';

/**
 * Тип входных параметров для компонента Switcher.
 * @memberof Switcher
 * @alias SwitcherProps
 * @typedef {object} SwitcherProps
 */
type SwitchProps = {
  /**
   * Описание действия кнопки.
   * */
  ariaLabel?: string;
  /**
   * Иконка неактивного состояния свитчера.
   *  */
  icon: ReactNode;
  /**
   * Иконка активного состояния свитчера.
   *  */
  iconChecked: ReactNode;
  /**
   * Функция переключения свитчера.
   *  */
  switchCallback: EventHandler<SyntheticEvent>;
  /**
   * Начальное положение свитчера.
   *  */
  switched?: boolean;
};

/**
 * UI компонент
 * Boolean кнопка переключения состояния. Компонент стилизован для двух тем приложения (светлой и темной).
 *
 * @component
 * @name Switcher
 * @param {string=} [ariaLabel='Кнопка переключения режима.'] - Описание действия кнопки.
 * @param {ReactNode} icon Иконка неактивного состояния свитчера.
 * @param {ReactNode} iconChecked Иконка активного состояния свитчера.
 * @param {EventHandler<SyntheticEvent>} switchCallback Функция переключения свитчера.
 * @param {boolean=} [switched=false] Начальное положение свитчера.
 * @example
 * * import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
 * * import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';
 *
 * * const switchedFlag = false;
 * * const switchedAriaLabel = 'Testing switcher button';
 * * return (
 * *   <Switcher
 *          switched={switchedFlag}
 *          ariaLabel={switchedAriaLabel}
 *          icon={<SunIcon file-name="sun" />}
 *          iconChecked={<MoonIcon file-name="moon" />}
 *          switchCallback={switchCallback}
 *       />
 * * )
 */
const Switcher: FC<SwitchProps> = ({
  ariaLabel = 'Кнопка переключения режима.',
  icon,
  iconChecked,
  switchCallback,
  switched = false,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(switched);

  /**
   * @function
   * @name handleSwitch
   * @memberof Switcher
   * @description Обработчик события onClick компонента Switcher - вспомогательная функция, которая переключает состояние кнопки. Вызывает {@link switchCallback}, переданный в компонент как параметр, после переключения состояния кнопки.
   * */
  const handleSwitch = useCallback(
    (e: SyntheticEvent) => {
      setIsChecked(!isChecked);
      switchCallback(e);
    },
    [isChecked, switchCallback],
  );

  return (
    <button
      className={clsx(styles.switch, {
        [styles.switch_checked]: isChecked,
      })}
      aria-checked={isChecked}
      aria-label={ariaLabel}
      role="switch"
      type="button"
      onClick={handleSwitch}
      data-testid={BUTTON_SWITCH_TEST_ID}
    >
      <span className={clsx(styles.switch__check)}>
        <span className={clsx(styles.icon_wrapper)}>
          <span
            className={clsx(styles.icon, styles.icon_unchecked)}
            aria-hidden={isChecked}
            data-testid={ICON_UNCHECKED_TEST_ID}
          >
            {icon}
          </span>
          <span
            className={clsx(styles.icon, styles.icon_checked)}
            aria-hidden={!isChecked}
            data-testid={ICON_CHECKED_TEST_ID}
          >
            {iconChecked}
          </span>
        </span>
      </span>
    </button>
  );
};

export default Switcher;
