import { test, expect } from '@playwright/test';
import { BOOKS_API } from '../../src/API/endpoints';
import { getE2EBookPayload } from '../../src/Data/apiData';
import { HomePage } from '../../src/pages/HomePage';
import { BookDetailPage } from '../../src/pages/BookDetailPage';
import { AddBookPage } from '../../src/pages/AddBookPage';

test('API_UI_integration: should create book via API and validate in UI', async ({ request, page }) => {
        //create book via API
        const book = getE2EBookPayload();
        const response = await request.post(BOOKS_API, { data: book });
        expect(response.status()).toBe(201);
        const created = await response.json();

        //validate via UI
        const homePage = new HomePage(page);
        await homePage.goto(); 
        await expect(homePage.loadingIndicator).toBeHidden();
        expect(await homePage.isHeadingVisible()).toBe(true);
        expect(await homePage.containsText(book.title)).toBeTruthy();
    });

test.describe('Navigation & Full User Journey', () => {
  test('complete journey: home → book detail → home → add book', async ({ page }) => {
    const homePage = new HomePage(page);
    const addBookPage = new AddBookPage(page);

    // Step 1: Land on home and verify books are listed
    await homePage.goto();
    await expect(homePage.loadingIndicator).toBeHidden();
    expect(await homePage.getBookCount()).toBeGreaterThan(0);

    // Step 2: Open first book detail
    await homePage.clickFirstBook();
    await expect(page.getByText('Loading book details...')).toBeHidden();
    await expect(homePage.heading).toBeVisible();
    await expect(page).toHaveURL(/.*\/book\/\d+/);

    // Step 3: Return to home
    await homePage.goto();
    await expect(homePage.loadingIndicator).toBeHidden();
    await expect(page).toHaveURL('/');

    // Step 4: Navigate to Add Book
    await homePage.clickAddBook();
    await expect(page).toHaveURL(/.*\/add-book/);

    // Step 5: Verify the form is usable
    await expect(addBookPage.titleField).toBeVisible();
  });

  test('verify re route to home page from unknown route', async ({ page }) => {
    const detailPage = new BookDetailPage(page);
    // Try to open an unknown id link and verify the 404 page
    await detailPage.goto(99999);
    expect(await detailPage.isNotFoundPage()).toBe(true);

    // Click on "Back to Library" button
    await detailPage.clickElement(detailPage.backButton);
    const homePage = new HomePage(page);
    await expect(homePage.loadingIndicator).toBeHidden();
    await expect(homePage.heading).toBeVisible();
  });
});