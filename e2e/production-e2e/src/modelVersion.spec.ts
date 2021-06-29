import {
  Page,
  Browser,
  ElementHandle,
  HTMLOrSVGElementHandle,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';

describe('Model version page test', () => {
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

    await page.goto(appConfig.modelVersionPageUrl);
    await page.waitForResponse('http://localhost/api/v2/model/version');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });

  describe('page structure', () => {
    let modelVersion: ElementHandle<HTMLOrSVGElement>;
    let modelVersionRows: HTMLOrSVGElementHandle[];
    let columnsFirst: HTMLOrSVGElementHandle[];
    let columnsSecond: HTMLOrSVGElementHandle[];
    let columnsThird: ElementHandle<HTMLOrSVGElement>;

    beforeAll(async () => {
      modelVersion = await page.$('.model-version');
      modelVersionRows = await modelVersion.$$('.model-version__row');
      columnsFirst = await modelVersionRows[0].$$('.model-version__col-6');
      columnsSecond = await modelVersionRows[1].$$('.model-version__col-6');
      columnsThird = await modelVersionRows[2].$('.model-version__col-12');
    });

    it('exist', async () => {
      expect(modelVersion).toBeTruthy();
    });

    it('should contain four rows', async () => {
      expect(modelVersionRows.length).toEqual(4);
    });

    describe('details', () => {
      let details: ElementHandle<HTMLOrSVGElement>;
      let header: string;
      let body: ElementHandle<HTMLOrSVGElement>;
      let detailsList: ElementHandle<HTMLOrSVGElement>;
      let detailsListItems: HTMLOrSVGElementHandle[];
      let detailsStatus: ElementHandle<HTMLOrSVGElement>;
      let buildLogsButton: ElementHandle<HTMLOrSVGElement>;
      let logContent: ElementHandle<HTMLOrSVGElement>;
      let logBody: ElementHandle<HTMLOrSVGElement>;
      let closeLogsButton: ElementHandle<HTMLOrSVGElement>;

      beforeAll(async () => {
        details = await columnsFirst[0];
        header = await details.$eval('.model-version__item-header', el => el.textContent);
        body = await details.$('.model-version__details');
        detailsList = await body.$('.model-version__details-list');
        detailsListItems = await detailsList.$$('li');
        detailsStatus = await body.$('.model-version__details-status');
        buildLogsButton = await detailsStatus.$('.model-version__details-status-button');
        logContent = await page.$('.log__content');
      });

      it('exist', async () => {
        expect(details).toBeTruthy();
        expect(detailsList).toBeTruthy();
        expect(detailsStatus).toBeTruthy();
        expect(logContent).toBeTruthy();
      });

      it('should contain header', async () => {
        expect(header).toEqual('Details');
      });

      it('should contain three details items', async () => {
        expect(detailsListItems.length).toEqual(3);
      });

      it('should display build logs', async () => {
        await buildLogsButton.click();
        logBody = await logContent.$('.log__body');
        closeLogsButton = await logContent.$('.log__close-icon');
        await expect(logBody).toBeTruthy();
      }, 30000);

      it('should close logs', async () => {
        await closeLogsButton.click();
      }, 40000);
    });

    describe('services', () => {
      let services: ElementHandle<HTMLOrSVGElement>;
      let title: string;
      let servicesList: ElementHandle<HTMLOrSVGElement>;
      let servicesListItems: HTMLOrSVGElementHandle[];

      beforeAll(async () => {
        services = columnsFirst[1];
        title = await services.$eval('.mv-services__title', el => el.textContent);
        servicesList = await services.$('.mv-services__list');
        servicesListItems = await servicesList.$$('.mv-services__item');
      });

      it('exist', async () => {
        expect(services).toBeTruthy();
      });

      it('should contain title', async () => {
        expect(title).toEqual('Services');
      });

      it('should contain three services', async () => {
        expect(servicesListItems.length).toEqual(3);
      });
    });

    describe('applications', () => {
      let applications: ElementHandle<HTMLOrSVGElement>;
      let header: string;
      let button: ElementHandle<HTMLOrSVGElement>;
      let sidebarList: ElementHandle<HTMLOrSVGElement>;
      let sidebarItems: HTMLOrSVGElementHandle[];
      let table: ElementHandle<HTMLOrSVGElement>;
      let tableBody: ElementHandle<HTMLOrSVGElement>;
      let tableRows: HTMLOrSVGElementHandle[];

      beforeAll(async () => {
        applications = columnsSecond[0];
        header = await applications.$eval('.model-version__item-header span', el => el.textContent);
        button = await applications.$('.model-version__item-header button');
        table = await applications.$('.hydro-table');
        tableBody = await table.$('.hydro-table-body');
        tableRows = await tableBody.$$('.hydro-table-body__row');
      });

      it('exist', async () => {
        expect(applications).toBeTruthy();
        expect(button).toBeTruthy();
        expect(table).toBeTruthy();
      });

      it('should contain header', async () => {
        expect(header.trim()).toEqual('Applications');
      });

      it('table body should contain two rows', async () => {
        expect(tableRows.length).toEqual(2);
      });

      it('after clicked create application', async () => {
        await button.click();
        await page.goto(appConfig.applicationsUrl);
        await page.waitForResponse('http://localhost/api/v2/model/version');
        sidebarList = await page.$('.sidebar__list');
        sidebarItems = await sidebarList.$$('.sidebar__item');
        await expect(sidebarItems.length).toEqual(3);
      });
    });

    describe('servables', () => {
      let servables: ElementHandle<HTMLOrSVGElement>;
      let header: string;
      let table: ElementHandle<HTMLOrSVGElement>;
      let tableBody: ElementHandle<HTMLOrSVGElement>;
      let tableRows: HTMLOrSVGElementHandle[];
      let buttons: ElementHandle<HTMLOrSVGElement>;
      let showLogsButton: ElementHandle<HTMLOrSVGElement>;
      let deleteButton: ElementHandle<HTMLOrSVGElement>;
      let logContent: ElementHandle<HTMLOrSVGElement>;
      let logBody: ElementHandle<HTMLOrSVGElement>;
      let deleteDialog: ElementHandle<HTMLOrSVGElement>;
      let deleteDialogContent: ElementHandle<HTMLOrSVGElement>;
      let deleteDialogButtons: ElementHandle<HTMLOrSVGElement>;
      let removeButton: ElementHandle<HTMLOrSVGElement>;
      let closeLogsButton: ElementHandle<HTMLOrSVGElement>;

      beforeAll(async () => {
        await page.goto(appConfig.modelVersionPageUrl);
        await page.waitForResponse('http://localhost/api/v2/model/version');
      });

      beforeAll(async () => {
        modelVersion = await page.$('.model-version');
        modelVersionRows = await modelVersion.$$('.model-version__row');
        columnsSecond = await modelVersionRows[1].$$('.model-version__col-6');
        servables = columnsSecond[1];
        header = await servables.$eval('.model-version__item-header', el => el.textContent);
        table = await servables.$('.hydro-table.servables-table');
        tableBody = await table.$('.hydro-table-body');
        tableRows = await tableBody.$$('.hydro-table-body__row');
        buttons = await tableBody.$('.servables-table__row-buttons');
        showLogsButton = await buttons.$('.hs-button--base-primary');
        deleteButton = await buttons.$('.hs-button--base-warning');
        logContent = await page.$('.log__content');
        deleteDialog = await page.$('.dialog__container');
      });

      it('exist', async () => {
        expect(servables).toBeTruthy();
      });

      it('should contain header', async () => {
        expect(header).toEqual('Servables');
      });

      it('should contain three rows', async () => {
        expect(tableRows.length).toEqual(3);
      });

      it('should display logs', async () => {
        await showLogsButton.click();
        logBody = await logContent.$('.log__body');
        closeLogsButton = await logContent.$('.log__close-icon');
        await expect(logBody).toBeTruthy();
      }, 20000);

      it('should close logs', async () => {
        await closeLogsButton.click();
      }, 10000);

      it('should show delete dialog', async () => {
        await deleteButton.click();
        deleteDialogContent = await deleteDialog.$('.dialog__content');
        expect(deleteDialogContent).toBeTruthy();
      }, 30000);


      it('should delete servable', async () => {
        deleteDialogButtons = await deleteDialogContent.$('.dialog__buttons');
        removeButton = await deleteDialogButtons.$('.hs-button--flat-warning');
        await removeButton.click();
        await expect(tableRows.length).toEqual(3);
      }, 30000);
    });

    describe('signatures', () => {
      let signatures: ElementHandle<HTMLOrSVGElement>;
      let header: string;
      let table: ElementHandle<HTMLOrSVGElement>;

      beforeAll(async () => {
        modelVersion = await page.$('.model-version');
        modelVersionRows = await modelVersion.$$('.model-version__row');
        signatures = await modelVersionRows[2].$('.model-version__col-12');
        header = await signatures.$eval('.model-version__item-header', el => el.textContent);
        table = await signatures.$('.signature');
      });

      it('exist', async () => {
        expect(signatures).toBeTruthy();
        expect(table).toBeTruthy();
      });

      it('should contain header', async () => {
        expect(header).toEqual('Signatures');
      });
    });

    describe('metadata', () => {
      let metadata: ElementHandle<HTMLOrSVGElement>;
      let header: string;
      let table: ElementHandle<HTMLOrSVGElement>;

      beforeAll(async () => {
        modelVersion = await page.$('.model-version');
        modelVersionRows = await modelVersion.$$('.model-version__row');
        metadata = await modelVersionRows[3].$('.model-version__col-12');
        header = await metadata.$eval('.model-version__item-header', el => el.textContent);
        table = await metadata.$('.metadata');
      });

      it('exist', async () => {
        expect(metadata).toBeTruthy();
        expect(table).toBeTruthy();
      });

      it('should contain header', async () => {
        expect(header).toEqual('Metadata');
      });
    });
  });
})
