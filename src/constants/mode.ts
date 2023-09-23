/**
 * Значение класса для применения стилей темной темы.
 * @memberof Mode
 * @alias ModeEnumClass
 * @readonly
 * @enum {'page_theme_dark'} DarkMode
 */
export const MODE_DARK_CLASS = 'page_theme_dark';
/**
 * Значение переменной-ключа локального хранилища (local storage) в котором хранится текущая тема пользователя.
 * @memberof Mode
 * @alias ModeEnumStorageKey
 * @readonly
 * @enum {'isDarkMode'} DarkMode
 */
export const MODE_LOCAL_STORAGE_KEY = 'isDarkMode';

/**
 * Значения переменных для смены темы.
 * @memberof Mode
 * @alias ModeEnum
 * @readonly
 * @enum {object} DarkMode
 */
export enum DarkMode {
  /**
   * ENUM значение для светлой темы.
   * @readonly
   * @enum {string}
   * */
  FALSE = '0',
  /**
   * ENUM значение для случая, когда тема отсутствует.
   * @readonly
   * @enum {string}
   * */
  NULL = '1',
  /**
   * ENUM значение для темной темы.
   * @readonly
   * @enum {string}
   * */
  TRUE = '2',
}
