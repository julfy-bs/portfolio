import { render } from '@testing-library/react';
import { describe, expect,test } from 'vitest';

import Avatar from './avatar';

describe('UI-компонент <Avatar /> рендерится без ошибок', () => {
  test(`без переданных параметров`, () => {
    const avatar = render(<Avatar />);
    expect(avatar).toMatchSnapshot();
  });

  test(`с параметром size === small`, () => {
    const avatar = render(<Avatar size={'small'} />);
    expect(avatar).toMatchSnapshot();
  });

  test(`с параметром image'`, () => {
    const imageLink = 'https://avatars.githubusercontent.com/u/61148628?v=4';
    const avatar = render(<Avatar size={'big'} image={imageLink} />);
    expect(avatar).toMatchSnapshot();
  });

  test(`с параметром image и alt'`, () => {
    const imageLink = 'https://avatars.githubusercontent.com/u/61148628?v=4';
    const avatar = render(<Avatar size={'big'} image={imageLink} alt={'Test photo'} />);
    expect(avatar).toMatchSnapshot();
  });
});
