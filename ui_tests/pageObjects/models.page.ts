import * as playwright from 'playwright-core';
export class ModelsPage {
  private readonly page: playwright.Page;
  private readonly baseUrl: string;
  private readonly modelsSidebarSelector='div.sidebar__list.ng-star-inserted'
  readonly modelSidebarSelector='div.sidebar__item.ng-star-inserted'
  readonly selectedModelSidebarSelector='div.sidebar__item--selected.ng-star-inserted'
  private readonly searchFieldSelector = 'input.sidebar__filter-input'
  private readonly modelsTableSelector = 'table'
  private readonly modelsTableRowsSelector = 'tbody'
  readonly modelsTableRowSelector = 'hs-model-versions-row.hydro-table-body__row.ng-star-inserted'
  readonly modelsTableHeaderSelector='thead.hydro-table-head'
  readonly releaseStatusSelector='hs-model-versions-row.hydro-table-body__row.ng-star-inserted td.hydro-table-body__cell hs-model-version-status'
  readonly detailsButtonSelector = ' DETAILS '
  readonly monitoringButtonSelector =' MONITORING '
  readonly versionColumnSelector='hs-model-versions-row.hydro-table-body__row.ng-star-inserted td.hydro-table-body__cell span.model-version__model-version'
  readonly runtimeTagColumnSelector='span.model-version__runtime-tag.ng-star-inserted'
  readonly runtimeColumnSelector='span.ng-star-inserted'
  readonly applicationColumnSelector='xpath=//html/body/hs-root/div/div[2]/hs-models-page/div/div[2]/hs-model-page/div/hs-model-versions/div/div[2]/table/tbody/hs-model-versions-row[1]/td[5]'
  // readonly applicationColumnSelector='div.model-version__application.ng-star-inserted'
  readonly createdColumnSelector='xpath=//html/body/hs-root/div/div[2]/hs-models-page/div/div[2]/hs-model-page/div/hs-model-versions/div/div[2]/table/tbody/hs-model-versions-row[1]/td[4]'


  constructor(page: playwright.Page, unifiedConsoleUrl: string) {
    this.page = page;
    this.baseUrl = unifiedConsoleUrl + '/models';
  }

  async searchField() {
    return this.page.$(this.searchFieldSelector);
  }

async sidebarModels(){
    return this.page.$(this.modelsSidebarSelector)
}


  async sidebarModel(model) {
    let models = await this.sidebarModels()
    return (models).$('text='+model)
  }
  async modelsTable(){
    return await this.page.$(this.modelsTableSelector)

  }

  async monitoringButton() {
    let table = await this.modelsTable()
    return (table).$('text='+this.monitoringButtonSelector)
  }

  async detailsButton() {
    let table = await this.modelsTable()
    return await (table).$('text='+this.detailsButtonSelector)
  }



}
