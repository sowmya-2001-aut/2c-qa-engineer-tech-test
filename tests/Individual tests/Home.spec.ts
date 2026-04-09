import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load the home page with a visible heading', async () => {
    expect(await homePage.isHeadingVisible()).toBe(true);
  });

  test('should display a non-empty list of books', async () => {
    const count = await homePage.getBookCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should show genre or rating information on book cards', async () => {
    const hasRating = await homePage.containsText('rating') || await homePage.containsText('Rating');
    const hasGenre = await homePage.containsText('genre') || await homePage.containsText('Genre');
    expect(hasRating || hasGenre).toBeTruthy();
  });

  test('should have a visible "Add Book" navigation link', async ({ page }) => {
    await expect(homePage.addBookLink.first()).toBeVisible();
  });

  test('should navigate to book detail when a book is clicked', async ({ page }) => {
    const bookData = await homePage.getBookData();
    await homePage.clickFirstBook();
    await expect(page.getByRole('heading', { name: bookData.title })).toBeVisible();
  });

  test('should navigate to add book page when link is clicked', async ({ page }) => {
    await homePage.clickAddBook();
    await expect(homePage.addBookTitle).toBeVisible();
  });

});