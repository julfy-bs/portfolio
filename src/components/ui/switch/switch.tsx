import { clsx } from 'clsx';
import { FC, MouseEventHandler, ReactNode } from 'react';

import {
  BUTTON_SWITCH_TEST_ID,
  ICON_CHECKED_TEST_ID,
  ICON_UNCHECKED_TEST_ID,
} from '../../../constants/tests/switch/values';
import styles from './switch.module.scss';

type SwitchProps = {
  ariaLabel: string;
  icon: ReactNode;
  iconChecked: ReactNode;
  switchCallback: MouseEventHandler<HTMLButtonElement>;
  switched: boolean;
};

const Switch: FC<SwitchProps> = ({ ariaLabel, icon, iconChecked, switchCallback, switched }) => {
  return (
    <button
      className={clsx(styles.switch, {
        [styles.switch_checked]: switched,
      })}
      aria-checked={switched}
      aria-label={ariaLabel}
      role="switch"
      type="button"
      onClick={switchCallback}
      data-testid={BUTTON_SWITCH_TEST_ID}
    >
      <span className={clsx(styles.switch__check)}>
        <span className={clsx(styles.icon_wrapper)}>
          <span
            className={clsx(styles.icon, styles.icon_unchecked)}
            aria-hidden={switched}
            data-testid={ICON_UNCHECKED_TEST_ID}
          >
            {icon}
          </span>
          <span
            className={clsx(styles.icon, styles.icon_checked)}
            aria-hidden={!switched}
            data-testid={ICON_CHECKED_TEST_ID}
          >
            {iconChecked}
          </span>
        </span>
      </span>
    </button>
  );
};

export default Switch;
