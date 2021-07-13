import {
  Page,
  Browser,
  ElementHandle,
  HTMLOrSVGElementHandle,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';

describe('Models page test', () => {
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

    await page.goto(appConfig.modelPageUrl);
    await page.waitForResponse('http://localhost/api/v2/model/version');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });

  describe('models header', () => {
    let header: ElementHandle<HTMLOrSVGElement>;
    let headerTile: ElementHandle<HTMLOrSVGElement>;
    let button: ElementHandle<HTMLOrSVGElement>;

    beforeAll(async () => {
      header = await page.$('.models-page__header');
      headerTile = await header.$('.models-header__model-name');
      button = await header.$('button');
    });

    it('exists', async () => {
      expect(header).toBeTruthy();
    });

    it('has model name', async () => {
      expect(headerTile).toBeTruthy();
    });

    it('has delete button', async () => {
      expect(button).toBeTruthy();
    });
  });

  describe('model versions', () => {
    let title: ElementHandle<HTMLOrSVGElement>;
    let table: ElementHandle<HTMLOrSVGElement>;
    let tableHeader: ElementHandle<HTMLOrSVGElement>;
    let tableBody: ElementHandle<HTMLOrSVGElement>;
    let tableHeaders: HTMLOrSVGElementHandle[];
    let tableRows: HTMLOrSVGElementHandle[];

    beforeAll(async () => {
      title = await page.$('.model-versions__header');
      table = await page.$('.hydro-table.model-versions__table');
      tableHeader = await table.$('.hydro-table-head');
      tableBody = await table.$('.hydro-table-body');
      tableHeaders = await tableHeader.$$('.hydro-table-head__cell');
      tableRows = await tableBody.$$('hs-model-versions-row');
    });

    it('title should exist', async () => {
      expect(title).toBeTruthy();
    });

    describe('model versions table', () => {
      it('table should exist', async () => {
        expect(table).toBeTruthy();
      });

      it('table header should contain six headers', async () => {
        expect(tableHeaders.length).toEqual(6);
      });

      it('table body should contain one row', async () => {
        expect(tableRows.length).toEqual(1);
      });

      it('after clicked shows model version page', async () => {
        await tableRows[0].click();
      });
    });
  });
})
