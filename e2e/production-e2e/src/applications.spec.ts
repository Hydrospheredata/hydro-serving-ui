import {
  Page,
  Browser,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';
import { ApplicationsHelper } from '../helpers/applications.helper';

describe('Applications page test', () => {
  let browser: Browser;
  let page: Page;
  let applicationsHelper: ApplicationsHelper;

  beforeAll(async () => {
    await initializeBrowser().then(config => {
      browser = config.browser;
      page = config.page;
      applicationsHelper = new ApplicationsHelper(page);
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });

  describe('sidebar', () => {
    let initialLength: number;

    beforeAll(async () => {
      await page.goto(appConfig.applicationsUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[1]}`);
      initialLength = await applicationsHelper.getSidebarItemsLength();
    });

    it('exists', async () => {
      await expect(await applicationsHelper.getSidebar()).toBeTruthy();
      await expect(await applicationsHelper.getSidebarButton()).toBeTruthy();
      await expect(await applicationsHelper.getSidebarInput()).toBeTruthy();
    });

    it('should show create application form', async () => {
      await applicationsHelper.clickOnCreateApplicationButton();
      await expect(await applicationsHelper.getApplicationForm()).toBeTruthy();
    });

    it('the list should be replenished with a new application', async () => {
      await applicationsHelper.fillFormInput('test_application');
      await applicationsHelper.clickOnAddApplicationButton();
      await expect(await applicationsHelper.getSidebarItemsLength()).toEqual(initialLength + 1);
    }, 20000);
  });

  describe('page', () => {
    beforeAll(async () => {
      await page.goto(appConfig.applicationsUrl);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[1]}`);
    });

    it('exists', async () => {
      await expect(await applicationsHelper.getApplicationsPage()).toBeTruthy();
    });

    it('header should contain three buttons', async () => {
      await expect(await applicationsHelper.getApplicationsHeaderButtonsLength()).toEqual(3);
    });

    it('should show dialog of remove application', async () => {
      await applicationsHelper.clickOnDeleteApplicationButton();
      await expect(await applicationsHelper.getDeleteDialog()).toBeTruthy();
    });

    it('should remove application', async () => {
      await applicationsHelper.clickOnRemoveApplicationButton();
    });
  });
});
