/** Управляемое состояние фильтра проектов. */
export interface ProjectFilterState {
  /** Поиск по названию и описанию без учёта регистра. */
  readonly query: string;
  /** Выбранные технологии, внутри фасета через ИЛИ. */
  readonly techs: readonly string[];
  /** Выбранные контрибьюторы по имени, тоже через ИЛИ. */
  readonly contributors: readonly string[];
}
