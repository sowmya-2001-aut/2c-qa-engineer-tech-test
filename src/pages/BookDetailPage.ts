import { Page, Locator,expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookDetailPage extends BasePage {
  // Locators
  readonly heading: Locator = this.page.locator('h1, h2').first();
  readonly subHeading: Locator = this.page.locator('h3');
  readonly backLink: Locator = this.page.locator('a.text-blue-600');
  readonly backButton: Locator = this.page.getByRole('link', { name: 'Back to Library', exact: true });
  readonly authorText: Locator = this.page.locator('.text-xl.text-gray-600');
  constructor(page: Page) {
    super(page);
  }

  
  /** Action navigate id */
  async goto(id: number | string) {
    await this.navigate(`/book/${id}`);
  }

  /** Action fetch heading */
  async getHeadingText(): Promise<string> {
    return this.heading.innerText();
  }

  /** Validation heading visibility */
  async isHeadingVisible(): Promise<boolean> {
    return this.heading.isVisible();
  }

  /** Validation back link */
  async isBackLinkVisible(): Promise<boolean> {
    await expect(this.backButton).toBeVisible();
    await expect(this.backLink).toContainText('Back to Library');
    return this.backLink.first().isVisible();
  }

  /** Validation author info */
  async hasAuthorInfo(): Promise<boolean> {
    await expect(this.authorText).toBeVisible();
    const authorName = await this.authorText.textContent();
    console.log(authorName);
    if (!authorName) return false;
    const cleanAuthorName = authorName.replace(/^by\s+/i, '').trim();
    return cleanAuthorName.length >=1;
  }

  /** Validation description info */
  async hasDescriptionInfo(): Promise<boolean> {
    await expect(this.subHeading.first()).toBeVisible();
    const content = await this.subHeading.allInnerTexts();
    //console.log(content);
    return (
      content.includes('Description') 
    );
  }

  /** Validation book metadata */
  async hasBookMetadata(): Promise<boolean> {
    await expect(this.subHeading.first()).toBeVisible();
    const content = await this.subHeading.allInnerTexts();
    return (
      content.includes('ISBN') &&
      content.includes('PAGES') &&
      content.includes('RATING') &&
      content.includes('PUBLISHED YEAR')&&
      content.includes('GENRE')
    );
  }

  /** Validation error page */
  async isNotFoundPage(): Promise<boolean> {
    const content = await this.getPageContent();
    return (
      content.toLowerCase().includes('not found') ||
      content.toLowerCase().includes('404') ||
      content.toLowerCase().includes('does not exist')
    );
  }
}