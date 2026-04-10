import { BasePage } from "./BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class HomePage extends BasePage {
  
  readonly url = '/';

  // Locators
  readonly heading: Locator = this.page.locator('h1');
  readonly bookCards: Locator = this.page.locator('article, [href*="/book/"], .book-card');
  readonly bookLinks: Locator = this.page.locator('a[href*="/book/"]');
  readonly addBookLink: Locator = this.page.getByRole('link', { name: /add book/i }).or(this.page.locator('a[href*="add-book"]'));
  readonly addBookTitle: Locator = this.page.getByRole('heading', { name: 'Add New Book' });
  readonly loadingIndicator: Locator = this.page.getByText('Loading books...');

  constructor(page: Page) {
    super(page);
  }

  /** Action navigate url */
  async goto() {
    await this.navigate(this.url);
  }

  /** Validation count books */
  async getBookCount(): Promise<number> {
    await expect(this.bookLinks.first()).toBeVisible();
    return this.bookLinks.count();
  }

  /** Action read data */
  async getBookData() {
    const card = this.bookCards.first();
    const title = await card.locator('h2').innerText();
    return {
      title
    };
  }
  /** Action click book */
  async clickFirstBook() {
    await this.clickElement(this.bookLinks.first());
    await this.page.waitForLoadState('networkidle');
  }

  /** Action click add */
  async clickAddBook() {
    await this.clickElement(this.addBookLink.first());
    await this.page.waitForLoadState('networkidle');
  }

  /** Validation heading visible */
  async isHeadingVisible(): Promise<boolean> {
    return this.heading.isVisible();
  }

  /** Validation contains text */
  async containsText(text: string): Promise<boolean> {
    await expect(this.bookLinks.first()).toBeVisible().catch(() => { });
    const content = await this.getPageContent();
    return content.includes(text);
  }
  
}