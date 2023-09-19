import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { ReactComponent as MoonIcon } from '../../../assets/icons/moon.svg';
import { ReactComponent as SunIcon } from '../../../assets/icons/sun.svg';
import Switch from './switch';

type SwitchProps = ComponentProps<typeof Switch>;

const meta: Meta<SwitchProps> = {
  title: 'switch',
  component: Switch,
  args: {
    ariaLabel: 'Переключить ночной режим',
    icon: <SunIcon file-name="sun" />,
    iconChecked: <MoonIcon file-name="moon" />,
    switchCallback: () => console.log('qwerty'),
    switched: false,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <Story />
      </div>
    ),
  ],
  // argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const ExampleSwitch: Story = {
  render: ({ ...args }) => <Switch {...args} />,
};
