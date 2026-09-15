import type { AvailabilityStatus } from '@/entities/profile';

/**
 * Один ключ используется и в i18n (`home.now.<key>.{title,desc}`), и как CSS-модификатор
 * точки, цвет и пульсация которой описаны в стилях.
 */
export const AVAILABILITY_KEY: Record<AvailabilityStatus, 'active' | 'open' | 'notLooking'> = {
  ACTIVE: 'active',
  OPEN: 'open',
  NOTLOOKING: 'notLooking',
};
