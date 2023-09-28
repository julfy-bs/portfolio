import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';
import Switcher from './switcher';
import mdx from './switcher.mdx';

type SwitchProps = ComponentProps<typeof Switcher>;
const switched = false;

const meta: Meta<SwitchProps> = {
  title: 'switcher',
  component: Switcher,
  args: {
    ariaLabel: 'Кнопка переключения режима.',
    icon: <SunIcon file-name="sun" />,
    iconChecked: <MoonIcon file-name="moon" />,
    switchCallback: () => null,
    switched: switched,
  },
  argTypes: {
    switched: {
      description: 'Начальное положение свитчера.',
      table: { defaultValue: { summary: false } },
      controls: { type: 'boolean' },
    },
    ariaLabel: {
      description: 'Описание действия кнопки.',
      table: { defaultValue: { summary: 'Кнопка переключения режима.' } },
    },
    icon: {
      description: 'Иконка неактивного состояния свитчера.',
      controls: { type: 'select' },
      options: {
        sun: <SunIcon file-name="sun" />,
        moon: <MoonIcon file-name="moon" />,
      },
    },
    iconChecked: {
      description: 'Иконка активного состояния свитчера.',
      controls: { type: 'select' },
      options: {
        sun: <SunIcon file-name="sun" />,
        moon: <MoonIcon file-name="moon" />,
      },
    },
    switchCallback: {
      description: 'Функция переключения свитчера.',
      table: { defaultValue: { summary: '() => {}' } },
      controls: {
        type: 'text',
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
      story: { inline: true },
      source: { type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switcher>;

export const LightMode: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          minHeight: '5vh',
          maxHeight: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  render: ({ ...args }) => <Switcher {...args} />,
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div
        className={'page_theme_dark'}
        style={{
          width: '100%',
          minHeight: '5vh',
          maxHeight: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  render: ({ ...args }) => <Switcher {...args} />,
};
