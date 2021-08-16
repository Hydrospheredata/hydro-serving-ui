import {
  Page,
  Browser,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';
import { ModelsHelper } from '../helpers/models.helper';

describe('Header test', () => {
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

  describe('header', () => {
    beforeEach(() => {
      jest.setTimeout(30000);
    });

    beforeAll(async () => {
      await page.goto(appConfig.url);
      await page.waitForResponse(`${appConfig.url}/${appConfig.api}/${appConfig.endpoints[0]}`);
    });

    it('exists', async () => {
      await expect(await modelsHelper.getHeader()).toBeTruthy();
    });

    describe('navigation', () => {
      it('exists', async () => {
        await expect(await modelsHelper.getNavigation()).toBeTruthy();
      });

      it('has logo', async () => {
        await expect(await modelsHelper.getLogo()).toBeTruthy();
      });

      it('has three main links', async () => {
        await expect(await modelsHelper.getLinksCount()).toBe(3);
      });

      describe('models link', () => {
        it('exist', async () => {
          await expect(await modelsHelper.getModelsLink()).toBeTruthy();
        });

        it('has right name', async () => {
          await expect(await modelsHelper.getModelsLinkText()).toBe('Models');
        });

        it('after clicked show models page', async () => {
          await modelsHelper.clickOnModelsLink();
        });
      });

      describe('applications link', () => {
        it('exist', async () => {
          await expect(await modelsHelper.getApplicationsLink()).toBeTruthy();
        });

        it('has right name', async () => {
          await expect(await modelsHelper.getApplicationsLinkText()).toBe(
            'Applications',
          );
        });

        it('after clicked show applications page', async () => {
          await modelsHelper.clickOnApplicationsLink();
        });
      });

      describe('deployment configs link', () => {
        it('exist', async () => {
          await expect(await modelsHelper.getDeploymentConfigsLink()).toBeTruthy();
        });

        it('has right name', async () => {
          await expect(await modelsHelper.getDeploymentConfigsLinkText()).toBe(
            'Deployment configs',
          );
        });

        it('after clicked show deployment configs page', async () => {
          await modelsHelper.clickOnDeploymentConfigsLink();
        });
      });
    });
  });
});
