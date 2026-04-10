import { Page, Locator,expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * BookFormData
 */
export interface BookFormData {
    title?: string;
    author?: string;
    genre?: string;
    publishedYear?: string;
    description?: string;
    isbn?: string;
    pages?: string;
    rating?: string;
}


export class AddBookPage extends BasePage {
    // ── Form field locators ────────────────────────────────────────────────────
    readonly titleField: Locator = this.page.getByLabel(/title/i);
    readonly authorField: Locator = this.page.getByLabel(/author/i);
    readonly genreField: Locator = this.page.getByLabel('Genre');
    readonly publishedYearField: Locator = this.page.getByLabel(/published year|year/i);
    readonly descriptionField: Locator = this.page.getByLabel(/description/i);
    readonly isbnField: Locator = this.page.getByLabel(/isbn/i);
    readonly pagesField: Locator = this.page.getByLabel(/pages/i);
    readonly ratingField: Locator = this.page.getByLabel(/rating/i);
    readonly heading: Locator = this.page.getByRole('heading', { name: 'Add New Book' })

    // ── Action locators ────────────────────────────────────────────────────────
    readonly submitButton: Locator = this.page.getByRole('button', { name: /submit|add|save/i });

    readonly bookAdded: Locator = this.page.getByRole('heading', { name: 'Book Added Successfully!' });
    readonly bookTitleH2: Locator = this.page.locator('h2');

    constructor(page: Page) {
        super(page);
    }
    // Required fields


    // ── Navigation 

    /** Action navigate url */
    async goto() {
        await this.navigate('/add-book');
    }

    // ── Form interactions

    /** Action fill data */
    async fillForm(data: BookFormData) {
        if (data.title !== undefined) {
            await this.fillElement(this.titleField, data.title);
        }
        if (data.author !== undefined) {
            await this.fillElement(this.authorField, data.author);
        }
        if (data.genre !== undefined && (await this.genreField.isVisible())) {
            await this.genreField.selectOption(data.genre);
        }
        if (data.publishedYear !== undefined && (await this.publishedYearField.isVisible())) {
            await this.fillElement(this.publishedYearField, data.publishedYear);
        }
        if (data.description !== undefined && (await this.descriptionField.isVisible())) {
            await this.fillElement(this.descriptionField, data.description);
        }
        if (data.isbn !== undefined && (await this.isbnField.isVisible())) {
            await this.fillElement(this.isbnField, data.isbn);
        }
        if (data.pages !== undefined && (await this.pagesField.isVisible())) {
            await this.fillElement(this.pagesField, data.pages);
        }
        if (data.rating !== undefined && (await this.ratingField.isVisible())) {
            await this.fillElement(this.ratingField, data.rating);
        }
    }

    /** Action submit form */
    async submit() {
        await this.clickElement(this.submitButton);
        await this.page.waitForLoadState('networkidle');
    }

    /** Action submit data */
    async fillAndSubmit(data: BookFormData) {
        await this.fillForm(data);
        await this.submit();
    }



    // ── State helpers ──────────────────────────────────────────────────────────

    /** Validation page url */
    async isOnAddBookPage(): Promise<boolean> {
        return this.page.url().includes('add-book');
    }

    /** Validation submission title */
    async isSubmissionSuccessful(title:string): Promise<boolean> {
        const titleValue = await this.titleField.textContent();
        return titleValue === title;    
  }



    /** Validation title value */
    async getTitleValue(): Promise<string> {
        return this.titleField.inputValue();
    }



    /** Validation title exists */
    async getBookTitleContents(expectTitle:string): Promise<boolean> {
       
        expect(this.bookTitleH2.first()).toBeVisible();
        const contents = await this.bookTitleH2.allTextContents();
        const cleanContents = contents.map(text => text.trim());
        return cleanContents.includes(expectTitle);
    }
}