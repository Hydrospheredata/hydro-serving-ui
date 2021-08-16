import { Page } from 'playwright';
import appConfig from '../app-config';
import { ApplicationsPage } from '../pageObjects/applications.page';

export class ApplicationsHelper {
  private readonly applicationsPage: ApplicationsPage;

  constructor(page: Page) {
    this.applicationsPage = new ApplicationsPage(page, appConfig.url);
  }

  async getSidebar() {
    return await this.applicationsPage.sidebar();
  }

  async getSidebarButton() {
    return await this.applicationsPage.sidebarButton();
  }

  async getSidebarInput() {
    return await this.applicationsPage.sidebarInput();
  }

  async getSidebarItemsLength() {
    return await this.applicationsPage.sidebarItemsLength();
  }

  async clickOnCreateApplicationButton() {
    await (await this.applicationsPage.createApplicationButton()).click();
  }

  async getApplicationForm() {
    return await this.applicationsPage.applicationForm();
  }

  async fillFormInput(text) {
    await (await this.applicationsPage.formInput()).fill(text);
  }

  async clickOnAddApplicationButton() {
    await (await this.applicationsPage.addApplicationButton()).click();
  }

  async getApplicationsPage() {
    return await this.applicationsPage.applicationsPage();
  }

  async getApplicationsHeaderButtons() {
    return await this.applicationsPage.applicationsHeaderButtons();
  }

  async getApplicationsHeaderButtonsLength() {
    return await this.applicationsPage.applicationsHeaderButtonsLength();
  }

  async clickOnDeleteApplicationButton() {
    await (await this.applicationsPage.deleteApplicationButton()).click();
  }

  async getDeleteDialog() {
    return await this.applicationsPage.deleteDialog();
  }

  async clickOnRemoveApplicationButton() {
    await (await this.applicationsPage.removeApplicationButton()).click();
  }
}
