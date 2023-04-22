import { test, expect } from '@playwright/test';
// test.describe.configure({ mode: 'parallel' });
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/31/register.html');
});

test.describe("email", () => {
  test.beforeEach(async ({page}) => {
    await page.getByLabel('E-mail必須').fill('fafafa');
  })
  test.afterEach(async ({page}, testInfo) => {
    await page.screenshot({ path: `./playwright/screenshots/register/${testInfo.title}.png` });
  })
  test('if input fill "fafafa", error message appear blur', async ({ page }) => {
    await page.getByLabel('E-mail必須').blur();
  });
  test('if input fill "fafafa", error message appear click', async ({ page }) => {
    await page.getByLabel('E-mail必須').click();
  });
})


test('if riyoukiyaku clicked, modal is open and exist 利用規約 text', async ({ page }) => {
  await page.locator('#js-checkbox-link').click ();
  await expect(page.locator('#js-modal-inner')).toContainText("利用規約")
  await page.screenshot({ path: "./playwright/screenshots/register/riyoukiyaku.png" });
});
