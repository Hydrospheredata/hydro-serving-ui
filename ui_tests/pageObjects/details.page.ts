import * as playwright from 'playwright-core';
export class DetailsPage {
  private readonly page: playwright.Page;
  private readonly baseUrl: string;
  private readonly detailsTableSelector='div.model-version__details'
  // readonly detailTableRowsSelector='li.model-version__details-list-item'
  readonly detailTableRowsTitleSelector='span.model-version__details-list-title'
  readonly detailTableRowsValueSelector='span.model-version__details-list-value'
  readonly statusSelector='hs-model-version-status.model-version__details-status-icon'
  private readonly showBuildLogsButtonSelector='button.model-version__details-status-button.hs-button.hs-button--base.hs-button--base-base.ng-star-inserted'
  private readonly monitoringButtonSelector='button.hs-button.hs-button--flat.hs-button--flat-primary'
  private readonly createApplicationButtonSelector='button.model-version__item-button.create-application-button.hs-button.hs-button--flat-primary'
  private readonly applicationsTableSelector='div.model-version__applications'
  readonly applicationsRowsSelector='div.model-version__applications-empty.ng-star-inserted'
  readonly applicationsHeaderSelector='th.hydro-table-head__cell'
  readonly applicationsEmptyRowsSelector='div.model-version__applications-empty.ng-star-inserted'
  private readonly servablesTableSelector='section.model-version__servables.ng-star-inserted'
  readonly servablesHeaderSelector='th.hydro-table-head__cell'
  readonly servablesRowsSelector='thead.hydro-table-body'
  readonly servablesEmptySelector='div.servables--is-empty.ng-star-inserted'
  private readonly signaturesTableSelector='section.model-version__signatures'
  readonly signaturesHeaderSelector='tr.fields-table__row.fields-table__row--labels td.fields-table__cell'
  readonly signaturesRowsSelector='tr.fields-table__row.ng-star-inserted'
  private readonly metadataTableSelector='section.model-version__metadata'
  readonly metadataRowsSelector='td.metadata__value'
  readonly metadataHeadersSelector='td.metadata__key'
  private readonly backToModelButtonSelector='span.model-version__header-link'
  readonly profileButtonSelector='span.fields-table__icon.ng-star-inserted'
  private readonly visualizationButtonSelector=' visualization '
  private readonly statButtonSelector=' stat '
  readonly tooltipSelector='span.tooltip.ng-star-inserted'
  readonly tooltipWrapperSelector='div.tooltip-wrapper'
  private readonly logsWindowSelector='div.log__content'
  // readonly logsRowsSelector='tr.log__item.ng-star-inserted'
  readonly logsRowsSelector='div.log__body'


  constructor(page: playwright.Page, unifiedConsoleUrl: string) {
    this.page = page;
    this.baseUrl = unifiedConsoleUrl + '/models/1/53';
  }


  async backToModelButton() {
    return await this.page.$(this.backToModelButtonSelector);
  }

  async detailsTable() {
    return await this.page.$(this.detailsTableSelector);
  }

  async showBuildLogsButton() {
    let table = await this.detailsTable()
    return await (table).$(this.showBuildLogsButtonSelector)
  }

  async monitoringButton() {
    return await this.page.$(this.monitoringButtonSelector);
  }

  async createApplicationButton() {
    return await this.page.$(this.createApplicationButtonSelector);
  }

  async applicationTable() {
    return await this.page.$(this.applicationsTableSelector);
  }

  async servablesTable() {
    return await this.page.$(this.servablesTableSelector);
  }

  async signaturesTable() {
    return await this.page.$(this.signaturesTableSelector);
  }

  async metadataTable() {
    return await this.page.$(this.metadataTableSelector);
  }

  async visualizationButton(){
   return await this.page.$('text='+this.visualizationButtonSelector)
  }

  async statButton(){
    return await this.page.$('text='+this.statButtonSelector)
  }

  async tooltipServices() {
    return await this.page.$(this.tooltipSelector);
  }

  async tooltipWrapper() {
    return await this.page.$$(this.tooltipWrapperSelector);
  }

  async logsWindow() {
    return await this.page.$(this.logsWindowSelector);
  }


















}
