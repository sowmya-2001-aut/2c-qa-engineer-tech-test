import { Page } from '@playwright/test';

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

}