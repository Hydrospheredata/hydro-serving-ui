import {
  Page,
  Browser,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';

describe('Deployment configs page test', () => {
  let browser: Browser;
  let page: Page;

  beforeEach(() => {
    jest.setTimeout(50000);
  });

  beforeAll(async () => {
    await initializeBrowser().then(config => {
      browser = config.browser;
      page = config.page;
    });

    await page.goto(appConfig.deploymentConfigsUrl);
    await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[2]}`);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });
});
