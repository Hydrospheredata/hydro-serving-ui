import {
  Page,
  Browser,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';
import { ModelsHelper } from '../helpers/models.helper';

describe('Models page test', () => {
  let browser: Browser;
  let page: Page;
  let modelsHelper: ModelsHelper;

  beforeAll(async () => {
    await initializeBrowser().then(config => {
      browser = config.browser;
      page = config.page;
      modelsHelper = new ModelsHelper(page);
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });

  describe('models header', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('exists', async () => {
      await expect(await modelsHelper.getModelsHeader()).toBeTruthy();
    });

    it('has model name', async () => {
      await expect(await modelsHelper.getModelsHeaderTile()).toBeTruthy();
    });

    it('has delete button', async () => {
      await expect(await modelsHelper.getModelsButton()).toBeTruthy();
    });
  });

  describe('model versions', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('title should exist', async () => {
      await expect(await modelsHelper.getModelsTitle()).toBeTruthy();
    });

    describe('model versions table', () => {
      it('table should exist', async () => {
        await expect(await modelsHelper.getModelsTable()).toBeTruthy();
      });

      it('table header should contain six headers', async () => {
        await expect(await modelsHelper.getModelsTableHeadersLength()).toEqual(6);
      });

      it('after clicked shows model version page', async () => {
        await modelsHelper.clickOnModelsTableRow();
      });
    });
  });
})
