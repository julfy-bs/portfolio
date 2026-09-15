import type { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * Сообщения локализуются, поэтому схема собирается фабрикой от `t` на текущем
 * языке. По полям совпадает с `LoginDto`.
 */
export function createLoginSchema(t: TFunction) {
  return z.object({
    username: z.string().trim().min(1, t('login.required.username')),
    password: z.string().min(1, t('login.required.password')),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
