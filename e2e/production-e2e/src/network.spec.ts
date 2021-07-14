import { Browser, Page } from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';

describe('Network', () => {
  let browser: Browser;
  let page: Page;

  beforeEach(() => {
    jest.setTimeout(30000);
  });

  beforeAll(async () => {
    await initializeBrowser().then(config => {
      browser = config.browser;
      page = config.page;
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('check endpoints', async () => {
    const responses = await Promise.all([
      ...appConfig.endpoints.map(endpoint =>
        page.waitForResponse(
          `${appConfig.url}/api/v${appConfig.apiVersion}/${endpoint}`,
        ),
      ),
      page.goto(appConfig.url),
    ]);

    const allResponsesHave200Status = responses.every(
      res => res.status() === 200,
    );
    expect(allResponsesHave200Status).toBe(true);
  });

  it('should return models', async () => {
    const [response] = await Promise.all([
      page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`),
      page.goto(appConfig.modelPageUrl)
    ]);
    const res = await response.json();
    expect(res.length).toBeGreaterThanOrEqual(1);
  });
});
