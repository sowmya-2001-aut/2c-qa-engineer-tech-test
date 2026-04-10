import { test, expect } from '@playwright/test';
import { BookDetailPage } from '../../src/pages/BookDetailPage';
import { VALID_BOOK_ID, UNKNOWN_BOOK_ID_NUM, UNKNOWN_BOOK_ID_STR } from '../../src/Data/metaData';

test.describe('Book Detail Page', () => {
  let bookDetailPage: BookDetailPage;

  test.beforeEach(async ({ page }) => {
    bookDetailPage = new BookDetailPage(page);
    await bookDetailPage.goto(VALID_BOOK_ID);
    await expect(bookDetailPage.loadingIndicator).toBeHidden();
  });

  test('should navigate to the correct book detail URL', async ({ page }) => {
    expect(page.url()).toMatch(/\/book\/1/);
  });

  test('should display a non-empty book title as heading', async () => {
    await expect(bookDetailPage.heading).toBeVisible();
    const text = await bookDetailPage.getHeadingText();
    expect(text.length).toBeGreaterThan(0);
  });

  test('should display the author information', async () => {
    expect(await bookDetailPage.hasAuthorInfo()).toBeTruthy();
  });

  test('should display a book description', async () => {
    expect(await bookDetailPage.hasDescriptionInfo()).toBeTruthy();
  });

  test('should display book metadata (ISBN, pages, or rating)', async () => {
    expect(await bookDetailPage.hasBookMetadata()).toBeTruthy();
  });

  test('should have a back navigation link and back navigation button', async () => {
    expect(await bookDetailPage.isBackLinkVisible()).toBeTruthy();
  });

  test('should show a not-found page for a non-existent book ID', async () => {
    await bookDetailPage.goto(UNKNOWN_BOOK_ID_NUM);
    expect(await bookDetailPage.isNotFoundPage()).toBeTruthy();
  });

  test('should handle an invalid (non-numeric) book ID gracefully', async () => {
    await bookDetailPage.goto(UNKNOWN_BOOK_ID_STR);
    expect(await bookDetailPage.isNotFoundPage()).toBeTruthy();
  });
});