import * as playwright from 'playwright-core';

export class ApplicationsPage {
  private readonly page: playwright.Page;
  private readonly baseUrl: string;
  readonly applicationsSidebarSelector = '.applications-page__sidebar';
  readonly applicationsSidebarHeaderSelector = '.sidebar__header';
  readonly applicationsSidebarButtonSelector = '.sidebar__button';
  readonly applicationsSidebarInputSelector = '.sidebar__input';
  readonly applicationsSidebarItemsSelector = '.sidebar__item';
  readonly createApplicationButtonSelector = '.applications-page__button';
  readonly createDialogSelector = '.dialog__container';
  readonly createDialogFooterSelector = '.dialog__footer';
  readonly initialLengthSelector = this.applicationsSidebarItemsSelector.length;
  readonly applicationFormSelector = '.application-form';
  readonly formInputSelector = '.hs-input__input';
  readonly addApplicationButtonSelector = '.hs-button--flat-primary';
  readonly applicationsPageSelector = '.applications-page__body';
  readonly applicationsHeaderSelector = '.application__header';
  readonly applicationsHeaderButtonsSelector = '.hs-button';
  readonly deleteApplicationButtonSelector = '.hs-button--flat-warning';
  readonly deleteDialogSelector = '.dialog__container';
  readonly removeApplicationButtonSelector = '.hs-button--flat-warning';

  constructor(page: playwright.Page, unifiedConsoleUrl: string) {
    this.page = page;
    this.baseUrl = unifiedConsoleUrl + '/applications';
  }

  async sidebar() {
    return await this.page.$(this.applicationsSidebarSelector);
  }

  async sidebarButton() {
    let sidebar = await this.sidebar();
    return await sidebar.$(this.applicationsSidebarButtonSelector);
  }

  async sidebarInput() {
    let sidebar = await this.sidebar();
    return await sidebar.$(this.applicationsSidebarInputSelector);
  }

  async sidebarItems() {
    let sidebar = await this.sidebar();
    return await sidebar.$$(this.applicationsSidebarItemsSelector);
  }

  async sidebarItemsLength() {
    let sidebarItems = await this.sidebarItems();
    return sidebarItems.length;
  }

  async createApplicationButton() {
    let sidebarButton = await this.sidebarButton();
    return await sidebarButton.$(this.createApplicationButtonSelector);
  }

  async createDialog() {
    return await this.page.$(this.createDialogSelector);
  }

  async createDialogFooter() {
    let createDialog = await this.createDialog();
    return await createDialog.$(this.createDialogFooterSelector);
  }

  async applicationForm() {
    let createDialog = await this.createDialog();
    return await createDialog.$(this.applicationFormSelector);
  }

  async formInput() {
    let form = await this.page.waitForSelector(this.applicationFormSelector);
    return await form.$(this.formInputSelector);
  }

  async addApplicationButton() {
    let createDialogFooter = await this.createDialogFooter();
    return await createDialogFooter.$(this.addApplicationButtonSelector);
  }

  async applicationsPage() {
    return await this.page.$(this.applicationsPageSelector);
  }

  async applicationsHeader() {
    let applicationsPage = await this.applicationsPage();
    return await applicationsPage.$(this.applicationsHeaderSelector);
  }

  async applicationsHeaderButtons() {
    let header = await this.applicationsHeader();
    return await header.$$(this.applicationsHeaderButtonsSelector);
  }

  async applicationsHeaderButtonsLength() {
    let headerButtons = await this.applicationsHeaderButtons();
    return headerButtons.length;
  }

  async deleteApplicationButton() {
    let header = await this.applicationsHeader();
    return await header.$(this.deleteApplicationButtonSelector);
  }

  async deleteDialog() {
    return await this.page.$(this.deleteDialogSelector);
  }

  async removeApplicationButton() {
    let dialog = await this.deleteDialog();
    return await dialog.$(this.removeApplicationButtonSelector);
  }
}
