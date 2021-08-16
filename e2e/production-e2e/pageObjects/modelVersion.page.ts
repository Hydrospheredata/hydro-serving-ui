import * as playwright from 'playwright-core';

export class ModelVersionPage {
  private readonly page: playwright.Page;
  private readonly baseUrl: string;
  readonly modelVersionSelector = '.model-version';
  readonly modelVersionRowsSelector = '.model-version__row';
  readonly columnSelector = '.model-version__col-6';
  readonly columnsSelector = '.model-version__col-12';
  readonly modelVersionHeaderSelector = '.model-version__item-header';
  readonly detailsHeaderSelector = '.model-version__item-header';
  readonly detailsListSelector = '.model-version__details-list';
  readonly detailsListItemsSelector = 'li';
  readonly detailsStatusSelector = '.model-version__details-status';
  readonly buildLogsButtonSelector = '.model-version__details-status-button';
  readonly logContentSelector = '.log__content';
  readonly logBodySelector = '.log__body';
  readonly closeLogsButtonSelector = '.log__close-icon';
  readonly servicesTitleSelector = '.mv-services__title';
  readonly servicesListSelector = '.mv-services__list';
  readonly servicesListItemsSelector = '.mv-service';
  readonly headerSelector = '.model-version__item-header span';
  readonly buttonSelector = '.model-version__item-header button';
  readonly tableSelector = '.hydro-table';
  readonly servablesHeaderSelector = '.model-version__item-header';
  readonly servablesTableSelector = '.hydro-table.servables-table';
  readonly servablesButtonsSelector = '.servables-table__row-buttons';
  readonly showLogsButtonSelector = '.hs-button--base-primary';
  readonly deleteButtonSelector = '.hs-button--base-warning';
  readonly deleteDialogSelector = '.dialog__container';
  readonly deleteDialogContentSelector = '.dialog__content';
  readonly signaturesSelector = '.model-version__col-12';
  readonly signaturesHeaderSelector = '.model-version__item-header';
  readonly signaturesTableSelector = '.signature';
  readonly metadataSelector = '.model-version__col-12';
  readonly metadataHeaderSelector = '.model-version__item-header';
  readonly metadataTableSelector = '.metadata';
  readonly mvcolumnSelector = '.flex-col';

  constructor(page: playwright.Page, unifiedConsoleUrl: string) {
    this.page = page;
    this.baseUrl = unifiedConsoleUrl + '/models/census/1';
  }

  async modelVersion() {
    return await this.page.waitForSelector(this.modelVersionSelector);
  }

  async column() {
    let modelVersion = await this.modelVersion();
    return await modelVersion.$(this.mvcolumnSelector);
  }

  async modelVersionRows() {
    let column = await this.column();
    return await column.$$(this.modelVersionRowsSelector);
  }

  async modelVersionRowsLength() {
    let modelVersionRows = await this.modelVersionRows();
    return modelVersionRows.length;
  }

  async columnsFirst() {
    let columns = await this.modelVersionRows();
    return await columns[0].$$(this.columnSelector);
  }

  async columnsSecond() {
    let columns = await this.modelVersionRows();
    return await columns[1].$$(this.columnSelector);
  }

  async modelVersionHeaders() {
    let modelVersion = await this.modelVersion();
    return await modelVersion.$$(this.modelVersionHeaderSelector);
  }

  async details() {
    let columnsFirst = await this.columnsFirst();
    return columnsFirst[0];
  }

  async detailsList() {
    let details = await this.details();
    return await details.$(this.detailsListSelector);
  }

  async detailsListItems() {
    let detailsList = await this.detailsList();
    return await detailsList.$$(this.detailsListItemsSelector);
  }

  async detailsListItemsLength() {
    let detailsListItems = await this.detailsListItems();
    return detailsListItems.length;
  }

  async detailsStatus() {
    let details = await this.details();
    return await details.$(this.detailsStatusSelector);
  }

  async detailsHeader() {
    let modelVersionHeaders = await this.modelVersionHeaders();
    return modelVersionHeaders[0];
  }

  async logContent() {
    return await this.page.$(this.logContentSelector);
  }

  async buildLogsButton() {
    let detailsStatus = await this.detailsStatus();
    return await detailsStatus.$(this.buildLogsButtonSelector);
  }

  async logBody() {
    let logContent = await this.logContent();
    return await logContent.$(this.logBodySelector);
  }

  async closeLogsButton() {
    let logContent = await this.logContent();
    return await logContent.$(this.closeLogsButtonSelector);
  }

  async services() {
    let columnsFirst = await this.columnsFirst();
    return columnsFirst[1];
  }

  async servicesTitle() {
    let modelVersion = await this.modelVersion();
    return await modelVersion.$(this.servicesTitleSelector);
  }

  async servicesList() {
    return await this.page.waitForSelector(this.servicesListSelector);
  }

  async servicesListItems() {
    let servicesList = await this.servicesList();
    return await servicesList.$$(this.servicesListItemsSelector);
  }

  async servicesListItemsLength() {
    let servicesListItems = await this.servicesListItems();
    return servicesListItems.length;
  }

  async applications() {
    let columnsSecond = await this.columnsSecond();
    return columnsSecond[0];
  }

  async header() {
    let applications = await this.applications();
    return await applications.$(this.headerSelector);
  }

  async button() {
    let applications = await this.applications();
    return await applications.$(this.buttonSelector);
  }

  async table() {
    let applications = await this.applications();
    return await applications.$(this.tableSelector);
  }

  async servables() {
    let columnsSecond = await this.columnsSecond();
    return columnsSecond[1];
  }

  async servablesHeader() {
    let modelVersionHeaders = await this.modelVersionHeaders();
    return modelVersionHeaders[2];
  }

  async servablesTable() {
    let servables = await this.servables();
    return await servables.$(this.servablesTableSelector);
  }

  async servablesButtons() {
    let servablesTable = await this.servablesTable();
    return await servablesTable.$(this.servablesButtonsSelector);
  }

  async showLogsButton() {
    let buttons = await this.servablesButtons();
    return await buttons.$(this.showLogsButtonSelector);
  }

  async deleteButton() {
    let buttons = await this.servablesButtons();
    return await buttons.$(this.deleteButtonSelector);
  }

  async deleteDialog() {
    return await this.page.$(this.deleteDialogSelector);
  }

  async deleteDialogContent() {
    let deleteDialog = await this.deleteDialog();
    return await deleteDialog.$(this.deleteDialogContentSelector);
  }

  async signatures() {
    let modelVersionRows = await this.modelVersionRows();
    return await modelVersionRows[2].$(this.columnsSelector);
  }

  async signaturesHeader() {
    let modelVersionHeaders = await this.modelVersionHeaders();
    return modelVersionHeaders[3];
  }

  async signaturesTable() {
    let signatures = await this.signatures();
    return await signatures.$(this.signaturesTableSelector);
  }

  async metadata() {
    let modelVersionRows = await this.modelVersionRows();
    return await modelVersionRows[3].$(this.columnsSelector);
  }

  async metadataHeader() {
    let metadata = await this.metadata();
    return await metadata.$(this.metadataHeaderSelector);
  }

  async metadataTable() {
    let metadata = await this.metadata();
    return await metadata.$(this.metadataTableSelector);
  }
}
