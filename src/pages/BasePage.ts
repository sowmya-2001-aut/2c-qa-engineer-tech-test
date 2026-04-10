import { Page, Locator,expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /** Action navigate path */
  async navigate(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle',{timeout:8000});
  }

  /** Action fetch content */
  async getPageContent(): Promise<string> {
    return this.page.content();
  }

  /** Action click element */
  async clickElement(locator: Locator) {
    //expect(locator).toBeVisible();
    await locator.click();
  }

  /** Action fill element */
  async fillElement(locator: Locator, text: string) {
    expect(locator).toBeVisible();
    await locator.fill(text);
  }

  async setViewport(width: number, height: number) {
      await this.page.setViewportSize({ width, height });
  }

}