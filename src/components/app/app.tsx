import { clsx } from 'clsx';
import { FC, useRef } from 'react';
import { useRoutes } from 'react-router-dom';

import { PATH } from '../../constants/routes';
import Mode from '../mode/mode';
import Avatar from '../ui/avatar/avatar';
import LinkText from '../ui/link-text/link-text';
import styles from './app.module.scss';

const App: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const routes = useRoutes([
    {
      path: PATH.HOME,
      element: (
        <>
          <LinkText text={'Главная'} external={false} route={PATH.HOME} navigation={true} />
          <LinkText text={'Навыки'} external={false} route={PATH.LOGIN} navigation={true} />
          <Avatar size={'small'} />
          <Mode themeRef={ref} />
        </>
      ),
    },
    {
      path: PATH.LOGIN,
      element: (
        <>
          <LinkText text={'Главная'} external={false} route={PATH.HOME} navigation={true} />
          <LinkText text={'Навыки'} external={false} route={PATH.LOGIN} navigation={true} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.{' '}
            <LinkText text={'Aliquam'} external={true} route={'https://julfy-bs.github.io/portfolio/'} />, nemo.
          </p>
          <Mode themeRef={ref} />
        </>
      ),
    },
  ]);

  return (
    <div className={clsx(styles.page)} ref={ref}>
      {routes}
    </div>
  );
};

export default App;
