import * as playwright from 'playwright-core';

export class ModelsPage {
  private readonly page: playwright.Page;
  private readonly baseUrl: string;
  readonly modelsHeaderSelector = '.models-page__header';
  readonly modelsBodySelector = '.models-page__body';
  readonly modelsHeaderTileSelector = '.models-header__model-name';
  readonly modelsButtonSelector = 'button';
  readonly modelsTitleSelector = '.model-versions__header';
  readonly modelsTableSelector = '.hydro-table.model-versions__table';
  readonly modelsTableHeaderSelector = '.hydro-table-head';
  readonly modelsTableBodySelector = '.hydro-table-body';
  readonly modelsTableHeadersSelector = '.hydro-table-head__cell';
  readonly modelsTableRowsSelector = 'hs-model-versions-row';

  readonly headerSelector = 'hs-header header';
  readonly navigationSelector = '.header-nav';
  readonly logoSelector = '.header__logo';
  readonly linksSelector = 'a';
  readonly modelsLinkSelector = 'a:first-of-type';
  readonly applicationsLinkSelector = 'a:nth-of-type(2)';
  readonly deploymentConfigsLinkSelector = 'a:last-of-type';

  constructor(page: playwright.Page, unifiedConsoleUrl: string) {
    this.page = page;
    this.baseUrl = unifiedConsoleUrl + '/models/census';
  }

  async modelsHeader() {
    return await this.page.waitForSelector(this.modelsHeaderSelector);
  }

  async modelsBody() {
    return await this.page.$(this.modelsBodySelector);
  }

  async modelsHeaderTile() {
    let header = await this.modelsHeader();
    return await header.$(this.modelsHeaderTileSelector);
  }

  async modelsButton() {
    let header = await this.modelsHeader();
    return await header.$(this.modelsButtonSelector);
  }

  async modelsTitle() {
    return await this.page.waitForSelector(this.modelsTitleSelector);
  }

  async modelsTable() {
    return await this.page.$(this.modelsTableSelector);
  }

  async modelsTableHeader() {
    let table = await this.modelsTable();
    return await table.$(this.modelsTableHeaderSelector);
  }

  async modelsTableBody() {
    let table = await this.modelsTable();
    return await table.$(this.modelsTableBodySelector);
  }

  async modelsTableHeaders() {
    let tableHeader = await this.modelsTableHeader();
    return await tableHeader.$$(this.modelsTableHeadersSelector);
  }

  async modelsTableHeadersLength() {
    let tableHeaders = await this.modelsTableHeaders();
    return tableHeaders.length;
  }

  async modelsTableRows() {
    let tableBody = await this.modelsTableBody();
    return await tableBody.$$(this.modelsTableRowsSelector);
  }

  async header() {
    return await this.page.$(this.headerSelector);
  }

  async navigation() {
    let header = await this.header();
    return await header.$(this.navigationSelector);
  }

  async logo() {
    let header = await this.header();
    return await header.$(this.logoSelector);
  }

  async links() {
    let navigation = await this.navigation();
    return await navigation.$$(this.linksSelector);
  }

  async linksCount() {
    let links = await this.links();
    return links.length;
  }

  async modelsLink() {
    let navigation = await this.navigation();
    return await navigation.$(this.modelsLinkSelector);
  }

  async applicationsLink() {
    let navigation = await this.navigation();
    return await navigation.$(this.applicationsLinkSelector);
  }

  async deploymentConfigsLink() {
    let navigation = await this.navigation();
    return await navigation.$(this.deploymentConfigsLinkSelector);
  }
}
