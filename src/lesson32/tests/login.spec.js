import { test, expect } from '@playwright/test';

test('Correct keyboard transitions in the login form', async ({ page }) => {
  await page.goto('http://localhost:3000/lesson32/login.html');

  const userIdArea = page.getByLabel('User ID (Name or E-mail)');
  const passwordArea = page.getByLabel('Password');
  const forgotPasswordLink = page.getByTestId('forgot-password-link');
  const submitButton = page.getByRole('button', { name: 'Login' });

  // form tab遷移
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'メニューを開閉する' })
  ).toBeFocused(); //hamburger button

  await page.keyboard.press('Tab');
  await expect(userIdArea).toBeFocused();
  await userIdArea.fill('takeda');

  await page.keyboard.press('Tab');
  await expect(passwordArea).toBeFocused();
  await passwordArea.fill('Fafafa0000');

  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'パスワードが表示されます' })
  ).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(forgotPasswordLink).toBeFocused();

  // submitボタン tab遷移
  await page.keyboard.press('Tab');
  await expect(submitButton).toBeFocused();
  page.keyboard.press('Enter');

  await expect(page.getByTestId('not-auth-text')).toContainText(
    '権限がありません'
  );
});
