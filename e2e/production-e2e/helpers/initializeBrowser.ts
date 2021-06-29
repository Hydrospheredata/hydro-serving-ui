import { Browser, BrowserContext, chromium, Page } from 'playwright';
const config = require('../../playwright.config');

export default async function initializeBrowser(): Promise<{
  browser: Browser;
  context: BrowserContext;
  page: Page;
}> {
  const browser = await chromium.launch(config.launchConfig);
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}
