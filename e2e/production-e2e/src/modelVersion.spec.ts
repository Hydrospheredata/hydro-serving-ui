import {
  Page,
  Browser,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';
import { ModelVersionHelper } from '../helpers/modelVersion.helper';

describe('Model version page test', () => {
  let browser: Browser;
  let page: Page;
  let modelVersionHelper: ModelVersionHelper;

  beforeAll(async () => {
    await initializeBrowser().then(config => {
      browser = config.browser;
      page = config.page;
      modelVersionHelper = new ModelVersionHelper(page);
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });

  describe('page structure', () => {
    beforeAll(async () => {
      // jest.setTimeout(60000);
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('exist', async () => {
      await expect(await modelVersionHelper.getModelVersionPage()).toBeTruthy();
    });

    it('should contain four rows', async () => {
      await expect(await modelVersionHelper.getModelVersionRowsLength()).toEqual(4);
    });
  });

  describe('services', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('should contain title', async () => {
      await expect(await modelVersionHelper.getServicesTitleText()).toEqual('Services');
    });

    it('should contain three services', async () => {
      await expect(await modelVersionHelper.getServicesListItemsLength()).toEqual(3);
    });
  });

  describe('applications', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('should contain header', async () => {
      await expect(await modelVersionHelper.getHeaderText()).toEqual('Applications');
    });

    it('should contain button', async () => {
      await expect(await modelVersionHelper.getButton()).toBeTruthy();
    });

    it('should contain table', async () => {
      await expect(await modelVersionHelper.getTable()).toBeTruthy();
    });
  });

  describe('signatures', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('should contain header', async () => {
      await expect(await modelVersionHelper.getSignaturesHeaderText()).toEqual('Signatures');
    });

    it('should contain table', async () => {
      await expect(await modelVersionHelper.getSignaturesTable()).toBeTruthy();
    });
  });

  describe('metadata', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('should contain header', async () => {
      await expect(await modelVersionHelper.getMetadataHeaderText()).toEqual('Metadata');
    });

    it('should contain table', async () => {
      await expect(await modelVersionHelper.getMetadataTable()).toBeTruthy();
    });
  });

  describe('details', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('exist', async () => {
      await expect(await modelVersionHelper.getDetails()).toBeTruthy();
      await expect(await modelVersionHelper.getDetailsList()).toBeTruthy();
      await expect(await modelVersionHelper.getDetailsStatus()).toBeTruthy();
      await expect(await modelVersionHelper.getLogContent()).toBeTruthy();
    });

    it('should contain header', async () => {
      await expect(await modelVersionHelper.getDetailsHeaderText()).toEqual('Details');
    });

    it('should contain three details items', async () => {
      await expect(await modelVersionHelper.getDetailsListItemsLength()).toEqual(3);
    });

    it('should display build logs', async () => {
      await modelVersionHelper.clickOnBuildLogsButton();
      await expect(await modelVersionHelper.getLogBody()).toBeTruthy();
    });

    it('should close logs', async () => {
      await modelVersionHelper.clickOnCloseLogsButton();
    });
  });

  describe('servables', () => {
    beforeAll(async () => {
      await page.goto(appConfig.modelVersionPageUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('should contain header', async () => {
      await expect(await modelVersionHelper.getServablesHeaderText()).toEqual('Servables');
    });

    it('should display logs', async () => {
      await modelVersionHelper.clickOnShowLogsButton();
      await expect(await modelVersionHelper.getLogBody()).toBeTruthy();
    });

    it('should close logs', async () => {
      await modelVersionHelper.clickOnCloseLogsButton();
    });

    it('should show delete dialog', async () => {
      await modelVersionHelper.clickOnDeleteButton();
      await expect(await modelVersionHelper.getDeleteDialogContent()).toBeTruthy();
    });
  });
})
