import { clsx } from 'clsx';
import { useRef } from 'react';

import Mode from '../mode/mode';
import Avatar from '../ui/avatar/avatar';
import styles from './app.module.scss';

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className={clsx(styles.page)} ref={ref}>
      <Avatar size={'small'} />
      <Mode themeRef={ref} />
    </div>
  );
};

export default App;
