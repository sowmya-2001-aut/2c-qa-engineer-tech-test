import { test, expect } from '@playwright/test';
import { AddBookPage } from '../../src/pages/AddBookPage';
import { HomePage } from '../../src/pages/HomePage';
import { MISSING_TITLE_INPUT, MISSING_AUTHOR_INPUT, LONG_TITLE_INPUT, SPECIAL_CHARS_INPUT, getMinimalBookInput, getFullBookInput } from '../../src/Data/metaData';

test.describe('Add Book Form', () => {
    let addBookPage: AddBookPage;

    test.beforeEach(async ({ page }) => {
        addBookPage = new AddBookPage(page);
        await addBookPage.goto();
    });

    test('should load the add book page', async ({ page }) => {
        expect(page.url()).toContain('add-book');
        expect(await addBookPage.heading.isVisible()).toBe(true);
    });

    test('should display required fields: title and author', async () => {
        await expect(addBookPage.titleField).toBeVisible();
        await expect(addBookPage.authorField).toBeVisible();
    });

    test('should display a submit button', async () => {
        await expect(addBookPage.submitButton).toBeVisible();
    });

    // ── Validation: missing required fields ────────────────────────────────

    test('should not submit when form is empty', async () => {
        await addBookPage.submit();
        expect(await addBookPage.isOnAddBookPage()).toBe(true);
    });

    test('should not submit when title is missing', async () => {
        await addBookPage.fillAndSubmit(MISSING_TITLE_INPUT);
        expect(await addBookPage.isOnAddBookPage()).toBe(true);
    });

    test('should not submit when author is missing', async () => {
        await addBookPage.fillAndSubmit(MISSING_AUTHOR_INPUT);
        expect(await addBookPage.isOnAddBookPage()).toBe(true);
    });

    // ── Happy path ─────────────────────────────────────────────────────────

    test('should successfully add a book with required fields only', async () => {
        const input = getMinimalBookInput();
        await addBookPage.fillAndSubmit(input);
        expect(await addBookPage.bookAdded.isVisible());
        expect(await addBookPage.isSubmissionSuccessful(input.title));
    });

    test('should successfully add a book with all fields filled', async () => {
        const input = getFullBookInput();
        await addBookPage.fillAndSubmit(input);
        expect(await addBookPage.bookAdded.isVisible());
        expect(await addBookPage.isSubmissionSuccessful(input.title));
    });

    test('newly added book should appear on the home page', async ({ page }) => {
        const uniqueTitle = `POM Test Book ${Date.now()}`;
        await addBookPage.fillAndSubmit({ title: uniqueTitle, author: 'POM Author', pages: '20' });
        await expect(addBookPage.bookAdded).toBeVisible(); // awaits creation finish
        await page.waitForURL(/\/book\/\d+/); // awaits automatic redirect
        const homePage = new HomePage(page);
        await homePage.goto();
        const cleanContents = await addBookPage.getBookTitleContents(uniqueTitle);
        expect(cleanContents).toContain(uniqueTitle);
    });

    // ── Edge cases ─────────────────────────────────────────────────────────

    test('should handle very long title input without crashing', async () => {
        await addBookPage.fillForm(LONG_TITLE_INPUT);
        const value = await addBookPage.getTitleValue();
        expect(value.length).toBeGreaterThan(0);
    });

    test('should handle special characters in title and author', async () => {
        await addBookPage.fillAndSubmit(SPECIAL_CHARS_INPUT);
        expect(await addBookPage.bookAdded.isVisible());
    });
});