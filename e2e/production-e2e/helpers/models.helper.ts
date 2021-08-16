import { Page } from 'playwright';
import appConfig from '../app-config';
import { ModelsPage } from '../pageObjects/models.page';

export class ModelsHelper {
  private readonly modelsPage: ModelsPage;

  constructor(page: Page) {
    this.modelsPage = new ModelsPage(page, appConfig.url);
  }

  async getModelsHeader() {
    return await this.modelsPage.modelsHeader();
  }

  async getModelsHeaderTile() {
    return await this.modelsPage.modelsHeaderTile();
  }

  async getModelsButton() {
    return await this.modelsPage.modelsButton();
  }

  async getModelsTitle() {
    return await this.modelsPage.modelsTitle();
  }

  async getModelsTable() {
    return await this.modelsPage.modelsTable();
  }

  async getModelsTableHeadersLength() {
    return await this.modelsPage.modelsTableHeadersLength();
  }

  async getModelsTableRows() {
    return await this.modelsPage.modelsTableRows();
  }

  async clickOnModelsTableRow() {
    await (await this.getModelsTableRows())[0].click();
  }

  async getHeader() {
    return await this.modelsPage.header();
  }

  async getNavigation() {
    return await this.modelsPage.navigation();
  }

  async getLogo() {
    return await this.modelsPage.logo();
  }

  async getLinksCount() {
    return await this.modelsPage.linksCount();
  }

  async getModelsLink() {
    return await this.modelsPage.modelsLink();
  }

  async getModelsLinkText() {
    let modelsLink = await this.getModelsLink();
    return await modelsLink.evaluate(el => el.textContent);
  }

  async clickOnModelsLink() {
    await (await this.getModelsLink()).click();
  }

  async getApplicationsLink() {
    return await this.modelsPage.applicationsLink();
  }

  async getApplicationsLinkText() {
    let applicationsLink = await this.getApplicationsLink();
    return await applicationsLink.evaluate(el => el.textContent);
  }

  async clickOnApplicationsLink() {
    await (await this.getApplicationsLink()).click();
  }

  async getDeploymentConfigsLink() {
    return await this.modelsPage.deploymentConfigsLink();
  }

  async getDeploymentConfigsLinkText() {
    let deploymentConfigsLink = await this.getDeploymentConfigsLink();
    return await deploymentConfigsLink.evaluate(el => el.textContent);
  }

  async clickOnDeploymentConfigsLink() {
    await (await this.getDeploymentConfigsLink()).click();
  }
}
