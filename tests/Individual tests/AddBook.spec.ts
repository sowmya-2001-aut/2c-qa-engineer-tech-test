import { test, expect } from '@playwright/test';
import { AddBookPage } from '../../src/pages/AddBookPage';
import { HomePage } from '../../src/pages/HomePage';
import { generateRandomName } from '@/util/helperUtil';

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
        await addBookPage.fillAndSubmit({ author: 'Test Author' });
        expect(await addBookPage.isOnAddBookPage()).toBe(true);
    });

    test('should not submit when author is missing', async () => {
        await addBookPage.fillAndSubmit({ title: 'Test Title' });
        expect(await addBookPage.isOnAddBookPage()).toBe(true);
    });

    // ── Happy path ─────────────────────────────────────────────────────────

    test('should successfully add a book with required fields only', async () => {
        const title = generateRandomName('Minimal Book');
        await addBookPage.fillAndSubmit({
            title: title,
            author: generateRandomName('Minimal Author'),
            pages: '100'
        });
        expect(await addBookPage.bookAdded.isVisible());
        expect(await addBookPage.isSubmissionSuccessful(title));
    });

    test('should successfully add a book with all fields filled', async () => {
        const title = generateRandomName('Success Book');
        await addBookPage.fillAndSubmit({
            title: title,
            author: generateRandomName('Author'),
            genre: 'Fiction',
            publishedYear: '2024',
            description: 'A full book entry created during testing.',
            isbn: '978-1234567890',
            pages: '320',
            rating: '4.5',
        });
        expect(await addBookPage.bookAdded.isVisible());
        expect(await addBookPage.isSubmissionSuccessful(title));
    });

    test('newly added book should appear on the home page', async ({ page }) => {
        const uniqueTitle = `POM Test Book ${Date.now()}`;
        await addBookPage.fillAndSubmit({ title: uniqueTitle, author: 'POM Author', pages: '20' });
        await expect(addBookPage.bookAdded).toBeVisible(); // awaits creation finish
        await page.waitForURL(/\/book\/\d+/); // awaits automatic redirect
        const homePage = new HomePage(page);
        await homePage.goto();
        expect(await addBookPage.getBookTitleContents(uniqueTitle)).toBe(true);
    });

    // ── Edge cases ─────────────────────────────────────────────────────────

    test('should handle very long title input without crashing', async () => {
        const longTitle = 'A'.repeat(500);
        await addBookPage.fillForm({ title: longTitle });
        const value = await addBookPage.getTitleValue();
        expect(value.length).toBeGreaterThan(0);
    });

    test('should handle special characters in title and author', async () => {
        await addBookPage.fillAndSubmit({
            title: "Special <Chars> & \"Quotes\"",
            author: "O'Brien & Co.",
            pages: '100'
        });
        expect(await addBookPage.bookAdded.isVisible());
    });
});