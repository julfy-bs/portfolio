import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';
import {
  BUTTON_SWITCH_TEST_ID,
  ICON_CHECKED_TEST_ID,
  ICON_UNCHECKED_TEST_ID,
} from '../../../constants/tests/switch/values';
import Switcher from './switcher';

describe('UI-компонент <Switch /> рендерится без ошибок', () => {
  const switchCallback = vi.fn();

  beforeEach(() => {
    const switchedFlag = false;
    const switchedAriaLabel = 'Testing switcher button';

    render(
      <Switcher
        switched={switchedFlag}
        ariaLabel={switchedAriaLabel}
        icon={<SunIcon file-name="sun" />}
        iconChecked={<MoonIcon file-name="moon" />}
        switchCallback={switchCallback}
      />,
    );
  });

  test('Есть в документе', () => {
    const button: HTMLButtonElement = screen.getByTestId(BUTTON_SWITCH_TEST_ID);
    expect(button).toBeInTheDocument();
  });

  test('Клик по кнопке меняет необходимые атрибуты', async () => {
    const button: HTMLButtonElement = screen.getByTestId(BUTTON_SWITCH_TEST_ID);
    const buttonUncheckedIcon: HTMLButtonElement = screen.getByTestId(ICON_UNCHECKED_TEST_ID);
    const buttonCheckedIcon: HTMLButtonElement = screen.getByTestId(ICON_CHECKED_TEST_ID);
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(buttonUncheckedIcon.getAttribute('aria-hidden')).toBe('false');
    expect(buttonCheckedIcon.getAttribute('aria-hidden')).toBe('true');
    await userEvent.click(button);
    expect(switchCallback).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(switchCallback).toHaveBeenCalledTimes(2);
  });

  test('Совпадает с snapshot', () => {
    expect(screen.getByTestId(BUTTON_SWITCH_TEST_ID)).toMatchSnapshot();
  });
});
