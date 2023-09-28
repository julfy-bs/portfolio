import { clsx } from 'clsx';
import { FC } from 'react';

import { ReactComponent as UserIcon } from '../../../assets/icons/user-question.svg';
import styles from './avatar.module.scss';

type AvatarSize = 'small' | 'big';

/**
 * Тип входных параметров для компонента Avatar.
 * @memberof Avatar
 * @alias AvatarProps
 * @typedef {object} AvatarProps
 */
type AvatarProps = {
  /**
   * Описание изображения.
   * */
  alt?: string;
  /**
   * Ссылка на изображение.
   * */
  image?: string;
  /**
   * Размер изображения.
   * */
  size?: AvatarSize;
};

/**
 * UI компонент.
 * Аватар - контентный элемент, который используется для отображения фотографий пользователей. Используется для отображения фото пользователей.
 *
 * Аватар принимает `size`, `image` и `alt` в качестве параметров. **Все параметры являются необязательными.**
 *
 * @component
 * @name Avatar
 * @param {string=} [alt='Кнопка переключения режима.'] - Описание действия кнопки.
 * @param {string=} [image=''] Иконка неактивного состояния свитчера.
 * @param {AvatarSize} [size='big'] Иконка активного состояния свитчера.
 * @example
 * * return (
 * *   <Avatar
 * *        alt={'Великолепное описание восхитительного изображения.'}
 * *        image={'https://avatars.githubusercontent.com/u/61148628?v=4'}
 * *        size={'small'}
 * *     />
 * * )
 */
const Avatar: FC<AvatarProps> = ({ image = '', alt = '', size = 'big' }) => {
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
