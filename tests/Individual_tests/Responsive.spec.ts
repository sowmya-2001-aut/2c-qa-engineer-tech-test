import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { BookDetailPage } from '../../src/pages/BookDetailPage';
import { AddBookPage } from '../../src/pages/AddBookPage';
import { VIEWPORTS, SCROLL_MOBILE_VIEWPORT } from '../../src/Data/metaData';

test.describe('Responsive Design', () => {
  for (const viewport of VIEWPORTS) {
    test(`home page renders correctly on ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.setViewport(viewport.width, viewport.height);
      await homePage.goto();
      await expect(homePage.loadingIndicator).toBeHidden();
      await expect(homePage.heading).toBeVisible();
      expect(await homePage.getBookCount()).toBeGreaterThan(0);
    });

    test(`add book form is usable on ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      const addBookPage = new AddBookPage(page);
      await addBookPage.setViewport(viewport.width, viewport.height);
      await addBookPage.goto();
      await expect(addBookPage.titleField).toBeVisible();
      await addBookPage.fillForm({ title: `${viewport.name} Test` });
      const value = await addBookPage.getTitleValue();
      expect(value).toBe(`${viewport.name} Test`);
    });
  }

  test('home page should not have horizontal scroll on mobile', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.setViewport(SCROLL_MOBILE_VIEWPORT.width, SCROLL_MOBILE_VIEWPORT.height);
    await homePage.goto();
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(395); // 375 + small tolerance
  });
});