import { Browser, BrowserContext, chromium, Page } from 'playwright';

export default async function initializeBrowser(): Promise<{
  browser: Browser;
  context: BrowserContext;
  page: Page;
}> {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}
