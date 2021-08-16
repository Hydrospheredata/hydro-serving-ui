import { Page } from 'playwright';
import appConfig from '../app-config';
import { ModelVersionPage } from '../pageObjects/modelVersion.page';

export class ModelVersionHelper {
  private readonly modelVersionPage: ModelVersionPage;

  constructor(page: Page) {
    this.modelVersionPage = new ModelVersionPage(page, appConfig.url);
  }

  async getModelVersionPage() {
    return await this.modelVersionPage.modelVersion();
  }

  async getModelVersionHeaders() {
    return await this.modelVersionPage.modelVersionHeaders();
  }

  async getModelVersionRowsLength() {
    return await this.modelVersionPage.modelVersionRowsLength();
  }

  async getDetails() {
    return await this.modelVersionPage.details();
  }

  async getDetailsList() {
    return await this.modelVersionPage.detailsList();
  }

  async getDetailsStatus() {
    return await this.modelVersionPage.detailsStatus();
  }

  async getLogContent() {
    return await this.modelVersionPage.logContent();
  }

  async getDetailsHeader() {
    return await this.modelVersionPage.detailsHeader();
  }

  async getDetailsHeaderText() {
    let detailsHeader = await this.getDetailsHeader();
    return await detailsHeader.evaluate(el => el.textContent);
  }

  async getDetailsListItemsLength() {
    return await this.modelVersionPage.detailsListItemsLength();
  }

  async getBuildLogsButton() {
    return await this.modelVersionPage.buildLogsButton();
  }

  async clickOnBuildLogsButton() {
    await (await this.getBuildLogsButton()).click();
  }

  async getLogBody() {
    return await this.modelVersionPage.logBody();
  }

  async getCloseLogsButton() {
    return await this.modelVersionPage.closeLogsButton();
  }

  async clickOnCloseLogsButton() {
    await (await this.getCloseLogsButton()).click();
  }

  async getServices() {
    return await this.modelVersionPage.services();
  }

  async getServicesTitle() {
    return await this.modelVersionPage.servicesTitle();
  }

  async getServicesTitleText() {
    let servicesTitle = await this.getServicesTitle();
    return await servicesTitle.evaluate(el => el.textContent);
  }

  async getServicesListItemsLength() {
    return await this.modelVersionPage.servicesListItemsLength();
  }

  async getHeader() {
    return await this.modelVersionPage.header();
  }

  async getHeaderText() {
    let header = await this.getHeader();
    return await header.evaluate(el => el.textContent.trim());
  }

  async getButton() {
    return await this.modelVersionPage.button();
  }

  async getTable() {
    return await this.modelVersionPage.table();
  }

  async getServablesHeader() {
    return await this.modelVersionPage.servablesHeader();
  }

  async getServablesHeaderText() {
    let servablesHeader = await this.getServablesHeader();
    return await servablesHeader.evaluate(el => el.textContent);
  }

  async getShowLogsButton() {
    return await this.modelVersionPage.showLogsButton();
  }

  async clickOnShowLogsButton() {
    await (await this.getShowLogsButton()).click();
  }

  async getDeleteButton() {
    return await this.modelVersionPage.deleteButton();
  }

  async clickOnDeleteButton() {
    await (await this.getDeleteButton()).click();
  }

  async getDeleteDialogContent() {
    return await this.modelVersionPage.deleteDialogContent();
  }

  async getSignatures() {
    return await this.modelVersionPage.signatures();
  }

  async getSignaturesTable() {
    return await this.modelVersionPage.signaturesTable();
  }

  async getSignaturesHeader() {
    return await this.modelVersionPage.signaturesHeader();
  }

  async getSignaturesHeaderText() {
    let signaturesHeader = await this.getSignaturesHeader();
    return await signaturesHeader.evaluate(el => el.textContent);
  }

  async getMetadata() {
    return await this.modelVersionPage.metadata();
  }

  async getMetadataTable() {
    return await this.modelVersionPage.metadataTable();
  }

  async getMetadataHeader() {
    return await this.modelVersionPage.metadataHeader();
  }

  async getMetadataHeaderText() {
    let metadataHeader = await this.getMetadataHeader();
    return await metadataHeader.evaluate(el => el.textContent);
  }
}
