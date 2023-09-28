import { clsx } from 'clsx';
import { FC, MouseEventHandler, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { LINK_TEST_ID, LINK_TEXT_TEST_ID } from '../../../constants/tests/text-link/values';
import styles from './link-text.module.scss';

/**
 * Типы входных параметров для компонента LinkText.
 * @memberof LinkText
 * @alias LinkTextProps
 * @typedef {object} LinkTextProps
 */
type LinkTextProps = {
  /**
   * Вложенные элементы. **Необязательный параметр.**
   * */
  children?: ReactNode;
  /**
   * Флаг означающий, что ссылка ведет на внешний источник. **Необязательный параметр.**
   * */
  external?: boolean;
  /**
   * Boolean флаг-индикатор, что ссылка является элементом навигации по сайту. **Необязательный параметр.**
   * */
  navigation?: boolean;
  /**
   * Функция выполняемая по нажатию на ссылку. **Необязательный параметр.**
   * */
  onClick?: MouseEventHandler;
  /**
   * Маршрут по которому ведет ссылка.
   * */
  route: string;
  /**
   * Текстовый контент ссылки.
   * */
  text: string;
};

/**
 * UI компонент.
 * Текстовая ссылка для выделения ссылок в тексте, а также для навигации по сайту.
 *
 * @component
 * @name LinkText
 * @example
 * * return (
 * *   <LinkText
 * *           text={ 'Навыки' }
 * *           external={ false }
 * *           route={ PATH.LOGIN }
 * *           navigation={ true }
 * *         />
 * * )
 * *
 * * or
 * *
 * * return (
 * * <p>
 * *   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
 * *   <LinkText
 * *      text={ 'Aliquam' }
 * *      external={ true }
 * *      route={ 'https://github.com/julfy-bs' }
 * *   />
 * *   , nemo.
 * * </p>
 * * )
 * */
const LinkText: FC<LinkTextProps> = ({ children, navigation = false, external = false, onClick, route, text }) => {
  const location = useLocation();

  return (
    <>
      {external ? (
        <a className={clsx(styles.link)} href={route} data-testid={LINK_TEST_ID}>
          {children}
          <span className={clsx(styles.text)} data-testid={LINK_TEXT_TEST_ID}>
            {text}
          </span>
        </a>
      ) : (
        <NavLink
          className={({ isActive }) =>
            clsx(styles.link, {
              [styles.link_active]: isActive,
              [styles.link_role_navigation]: navigation,
            })
          }
          onClick={onClick}
          to={route}
          tabIndex={location.pathname === route ? -1 : 0}
          data-testid={LINK_TEST_ID}
        >
          {children}
          <span className={clsx(styles.text)} data-testid={LINK_TEXT_TEST_ID}>
            {text}
          </span>
        </NavLink>
      )}
    </>
  );
};

export default LinkText;
