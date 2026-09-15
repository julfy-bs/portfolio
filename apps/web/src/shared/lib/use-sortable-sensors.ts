import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

/**
 * Перетаскивание начинается только после сдвига на 6px, иначе клик по кнопкам внутри
 * элемента превращался бы в drag.
 */
export function useSortableSensors(): ReturnType<typeof useSensors> {
  return useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
}
