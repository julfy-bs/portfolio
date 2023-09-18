import { clsx } from 'clsx';
import { FC } from 'react';

import { ReactComponent as UserIcon } from '../../../assets/icons/user-question.svg';
import styles from './avatar.module.scss';

type AvatarSize = 'small' | 'big';

type AvatarProps = {
  alt?: string;
  image?: string;
  size?: AvatarSize;
};

const Avatar: FC<AvatarProps> = (props) => {
  const { image = '', alt = '', size = 'big' } = props;
  return (
    <>
      {image ? (
        <picture
          className={clsx(styles.wrapper, {
            [styles.wrapper_big]: size === 'big',
            [styles.wrapper_small]: size === 'small',
          })}
        >
          <img src={image} alt={alt ? alt : 'Фото пользователя.'} className={clsx(styles.photo)} />
        </picture>
      ) : (
        <span
          className={clsx(styles.wrapper, {
            [styles.wrapper_big]: size === 'big',
            [styles.wrapper_small]: size === 'small',
          })}
        >
          <UserIcon className={clsx(styles.icon)} />
        </span>
      )}
    </>
  );
};

export default Avatar;
