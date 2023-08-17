import { test, expect } from '@playwright/test';

test('If your email address was already registered in the member registration, you will get an error', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/32/register.html');

  const name = 'takeda';
  const email = 'fafafa@sample.com';
  const password = 'Fafafa0000';

  // 会員登録する
  await page.getByLabel('UserName必須').fill(name);
  await page.getByLabel('E-mail必須').fill(email);
  await page
    .getByLabel('Password ( 8文字以上の大小英数字 )必須')
    .fill(password);
  await page.getByTestId('terms-link').click();
  await page.getByTestId('modal-contents').click();
  await page.getByTestId('last-sentence').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Create My Account' }).click();
  await page.getByRole('link', { name: 'ログインページへ移動する' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();

  // 再度同じメールアドレスで会員登録する
  await page.getByLabel('UserName必須').fill(name);
  await page.getByLabel('E-mail必須').fill(email);
  await page
    .getByLabel('Password ( 8文字以上の大小英数字 )必須')
    .fill(password);
  await page.getByTestId('terms-link').click();
  await page.getByTestId('modal-contents').click();
  await page.getByTestId('last-sentence').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Close' }).click();

  const button = page.getByRole('button', { name: 'Create My Account' });
  await button.click();
  await expect(button).toBeDisabled();

  const errorArea = page.getByTestId('error-area');
  await expect(errorArea).toHaveText('既に登録済みのメールアドレスです');
});

test('Correct keyboard transitions in the register form', async ({ page }) => {
  await page.goto('http://localhost:3000/32/register.html');

  const userNameArea = page.getByLabel('UserName必須');
  const emailArea = page.getByLabel('E-mail必須');
  const passwordArea = page.getByLabel(
    'Password ( 8文字以上の大小英数字 )必須'
  );
  const modalCloseButton = page.getByRole('button', { name: 'Close' });
  const submitButton = page.getByRole('button', { name: 'Create My Account' });

  // form tab遷移
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'メニューを開閉する' })
  ).toBeFocused(); //hamburger button

  await page.keyboard.press('Tab');
  await expect(userNameArea).toBeFocused();
  await userNameArea.fill('takeda');

  await page.keyboard.press('Tab');
  await expect(emailArea).toBeFocused();
  await emailArea.fill('fafafa@sample.com');

  await page.keyboard.press('Tab');
  await expect(passwordArea).toBeFocused();
  await passwordArea.fill('Fafafa0000');

  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'パスワードが表示されます' })
  ).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('terms-link')).toBeFocused(); //利用規約リンク
  await page.keyboard.press('Enter');

  // 利用規約モーダル内 tab遷移
  await page.getByTestId('last-sentence').scrollIntoViewIfNeeded(); //最後の文章までスクロール

  await expect(modalCloseButton).toBeFocused();
  await page.keyboard.press('Enter');

  // submitボタン tab遷移
  await expect(submitButton).toBeFocused();
  page.keyboard.press('Enter');

  await expect(page.getByTestId('complete-text')).toContainText(
    'アカウント登録が完了しました。'
  );
});
