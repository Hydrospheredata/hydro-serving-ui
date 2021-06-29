import {
  Page,
  Browser,
  ElementHandle,
  HTMLOrSVGElementHandle,
} from 'playwright';
import appConfig from '../app-config';
import initializeBrowser from '../helpers/initializeBrowser';

describe('Applications page test', () => {
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

    await page.goto(appConfig.applicationsUrl);
    await page.waitForResponse('http://localhost/api/v2/application');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('loaded', async () => {
    expect(page).toBeTruthy();
  });

  describe('sidebar', () => {
    let sidebar: ElementHandle<HTMLOrSVGElement>;
    let sidebarHeader: ElementHandle<HTMLOrSVGElement>;
    let sidebarButton: ElementHandle<HTMLOrSVGElement>;
    let sidebarInput: ElementHandle<HTMLOrSVGElement>;
    let sidebarList: ElementHandle<HTMLOrSVGElement>;
    let sidebarItems: HTMLOrSVGElementHandle[];
    let createApplicationButton: ElementHandle<HTMLOrSVGElement>;
    let createDialog: ElementHandle<HTMLOrSVGElement>;
    let createDialogFooter: ElementHandle<HTMLOrSVGElement>;
    let form: ElementHandle<HTMLOrSVGElement>;
    let input: ElementHandle<HTMLOrSVGElement>;
    let createDialogButtons: ElementHandle<HTMLOrSVGElement>;
    let addApplicationButton: ElementHandle<HTMLOrSVGElement>;

    beforeAll(async () => {
      sidebar = await page.$('.applications-page__sidebar');
      sidebarHeader = await sidebar.$('.sidebar__header');
      sidebarButton = await sidebarHeader.$('.sidebar__button');
      sidebarInput = await sidebarHeader.$('.sidebar__input');
      sidebarList = await sidebar.$('.sidebar__list');
      sidebarItems = await sidebarList.$$('.sidebar__item');
      createApplicationButton = await sidebarButton.$('.applications-page__button');
      createDialog = await page.$('.dialog__container');
    });

    it('exists', async () => {
      expect(sidebar).toBeTruthy();
      expect(sidebarButton).toBeTruthy();
      expect(sidebarInput).toBeTruthy();
    });

    it('should contain two applications', async () => {
      expect(sidebarItems.length).toEqual(2);
    });

    it('should show create application form', async () => {
      await createApplicationButton.click();
      form = await createDialog.$('.application-form');
      createDialogFooter = await createDialog.$('.dialog__footer');
      createDialogButtons = await createDialogFooter.$('.dialog__buttons');
      addApplicationButton = await createDialogButtons.$('.hs-button--flat-primary');
      expect(form).toBeTruthy();
    }, 30000);

    it('should create application', async () => {
      input = await form.$('.hs-input__input');
      input.fill('test_application');
      await addApplicationButton.click();
    }, 30000);

    it('the list should be replenished with a new application', async () => {
      sidebar = await page.$('.applications-page__sidebar');
      sidebarList = await sidebar.$('.sidebar__list');
      sidebarItems = await sidebarList.$$('.sidebar__item');
      await expect(sidebarItems.length).toEqual(3);
    });
  });

  describe('page', () => {
    let applicationsPage: ElementHandle<HTMLOrSVGElement>;
    let header: ElementHandle<HTMLOrSVGElement>;
    let headerButtons: ElementHandle<HTMLOrSVGElement>;
    let buttons: HTMLOrSVGElementHandle[];
    let body: ElementHandle<HTMLOrSVGElement>;

    beforeAll(async () => {
      applicationsPage = await page.$('.applications-page__body');
      header = await applicationsPage.$('.application__header');
      headerButtons = await header.$('.application__header-buttons');
      buttons = await headerButtons.$$('.hs-button');
      body = await applicationsPage.$('.application__body');
    });

    it('exists', async () => {
      expect(page).toBeTruthy();
      expect(body).toBeTruthy();
    });

    it('header should contain three buttons', async () => {
      expect(buttons.length).toEqual(3);
    });
  });
});
