import { expect, test } from '@playwright/test';

// Гоняется на прод-сборке с MSW-моками. Их состояние живёт в странице, поэтому между
// кабинетом и главной переходим SPA-навигацией: перезагрузка сбросила бы моки.

const CREDENTIALS = { username: 'admin', password: 'admin12345' };

const NEW_ROLE = 'Staff Frontend Engineer';

test('гость смотрит проект, владелец правит профиль в CRM и видит изменение на сайте', async ({
  page,
}) => {
  // Гость открывает проект
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Богдан Сутужко' })).toBeVisible();

  await page.getByRole('button', { name: 'Проекты' }).first().click();
  await expect(page).toHaveURL(/\/projects$/);

  await page
    .getByRole('button', { name: /Procharity/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/projects\/procharity$/);
  await expect(page.getByRole('heading', { name: 'Procharity' })).toBeVisible();

  // Закрытый раздел уводит гостя на логин
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole('textbox', { name: /логин/i }).fill(CREDENTIALS.username);
  await page.getByLabel(/пароль/i).fill(CREDENTIALS.password);
  await page.getByRole('button', { name: 'Войти' }).click();

  // После входа возвращаемся на `/admin`, а кабинет сам открывает профиль в текущей локали.
  await expect(page).toHaveURL(/\/admin\/profile\/ru$/);

  // Правим роль в кабинете
  const role = page.getByRole('textbox', { name: 'Роль' });
  await expect(role).toHaveValue('Fullstack-разработчик');
  await role.fill(NEW_ROLE);
  await page.getByRole('button', { name: 'Сохранить' }).click();

  await expect(page.getByText('Сохранено')).toBeVisible();

  // Проверяем правку на главной
  await page.getByRole('link', { name: 'На главную' }).click();
  await expect(page).toHaveURL(new RegExp(`${page.url().split('/').slice(0, 3).join('/')}/?$`));

  await expect(page.getByText(NEW_ROLE).first()).toBeVisible();

  // Старая роль ещё встречается в тексте «обо мне» (это отдельное поле `bioMarkdown`),
  // поэтому проверяем именно подпись в hero.
  await expect(page.getByText(`@sutuzhko`).first()).toBeVisible();
  await expect(page.locator('h1').locator('..')).toContainText(NEW_ROLE);
});
