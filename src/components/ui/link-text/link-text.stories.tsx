import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';

import { PATH } from '../../../constants/routes';
import LinkText from './link-text';
import mdx from './link-text.mdx';

type LinkTextProps = ComponentProps<typeof LinkText>;

const meta: Meta<LinkTextProps> = {
  title: 'link-text',
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
  component: LinkText,
  args: {
    text: 'Войти',
    route: PATH.LOGIN,
    external: false,
    navigation: false,
  },
  argTypes: {
    text: {
      description: 'Контент ссылки.',
    },
    route: {
      description: 'Путь по которому ведет ссылка.',
    },
    external: {
      description: 'Индикатор обозначающий, что ссылка является внешней.',
      table: { defaultValue: { summary: false } },
      controls: { type: 'boolean' },
    },
    navigation: {
      description: 'Индикатор обозначающий, что ссылка используется для навигации.',
      table: { defaultValue: { summary: false } },
      controls: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
      story: { inline: true },
      source: { type: 'code' },
    },
    reactRouter: reactRouterParameters({
      routing: { path: PATH.HOME },
    }),
  },
};

export default meta;
type Story = StoryObj<typeof LinkText>;

export const Default: Story = {
  render: ({ ...args }) => <LinkText {...args} />,
};
