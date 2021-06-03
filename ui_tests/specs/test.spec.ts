// import * as baseHelper from '../ui_tests/helpers/base.helper';
// import * as ModelsHelper from '../ui_tests/helpers/models.helper';
import * as playwright from 'playwright-core';
import {ModelsPage} from '../pageObjects/models.page';
import { ModelsHelper } from '../helpers/models.helper';
import { BaseHelper } from '../helpers/base.helper';

describe("React App", () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let modelsHelper: ModelsHelper;
  let baseHelper: BaseHelper;

  beforeAll(async () => {
    baseHelper = new BaseHelper()
    browser = await baseHelper.createBrowser();
    page = await baseHelper.createPage(browser);
    modelsHelper = new ModelsHelper(page)

  });
  beforeEach(async () => {
    await page.goto('http://localhost/');
  });

  // afterEach(async () => {
  //   await close();
  // });
  it('test test', async () => {
    // await modelsHelper.fillSearchField('test')
    // expect(await getTitle()).toBe('React App');
    // await modelsHelper.clickOnSideBarModel('adult_monitoring_test')
    await modelsHelper.clickOnDetailsButton()
     await browser.close()
  });
});
