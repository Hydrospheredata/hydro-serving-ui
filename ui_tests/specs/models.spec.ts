import * as playwright from 'playwright-core';
import { ModelsHelper } from '../helpers/models.helper';
import { BaseHelper } from '../helpers/base.helper';

describe("Models Page", () => {
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


  describe('page structure', () => {
    beforeAll(async () => {
      await page.goto('http://localhost/');
      await page.waitForResponse('http://localhost/api/v2/model/version')
    });


    it('check search field', async () => {
      await modelsHelper.fillSearchField('adult_monitoring_test')
      await expect(await modelsHelper.getSidebarListText()).toContain('adult_monitoring_test')
    })

    it('check table is chosen', async () => {
      await expect(await modelsHelper.getSidebarSelectedItemAttribute()).toEqual('adult_monitoring_test')
    })

    it('check table header', async () => {
      await expect(await modelsHelper.getTableHeaderText()).toContain('version')
      await expect(await modelsHelper.getTableHeaderText()).toContain('status')
      await expect(await modelsHelper.getTableHeaderText()).toContain('runtime')
      await expect(await modelsHelper.getTableHeaderText()).toContain('created')
      await expect(await modelsHelper.getTableHeaderText()).toContain('applications')
    })

    }
  )

  describe('table data', () => {
      beforeAll(async () => {
        await page.goto('http://localhost/');
        await page.waitForResponse('http://localhost/api/v2/model/version')
      });

      it('check version', async () => {
        await expect(await modelsHelper.getVersion()).not.toBeNull()
      })

      it('check status', async () => {
        await expect(await modelsHelper.getReleaseStatusHTML()).toContain('released')
      })

      it('check runtime', async () => {
        await expect(await modelsHelper.getRuntime()).toEqual('hydrosphere/serving-runtime-python-3.6 0.1.2-rc0')
      })

      it('check created', async () => {
        await expect(await modelsHelper.getCreated()).not.toBeNull()
      })

      it('check application', async () => {
        await expect(await modelsHelper.getApplication()).toEqual('')
      })



  }
  )

  describe('navigation', () => {
    beforeEach(async () => {
      await page.goto('http://localhost/');
      await page.waitForResponse('http://localhost/api/v2/model/version')
    });

    it('go to details', async () => {

      await modelsHelper.clickOnDetailsButton()
    })

    it('go to monitoring', async () => {
      await modelsHelper.clickOnMonitoringButton()
    })

    }
  )
});
