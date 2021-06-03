import { BaseHelper } from './base.helper';
import {DetailsPage} from '../pageObjects/details.page';
import * as playwright from 'playwright-core';
import { ModelsPage } from '../pageObjects/models.page';

export class DetailsHelper extends BaseHelper {
  private readonly detailsPage: DetailsPage;

  constructor(page: playwright.Page) {
    super();
    this.detailsPage = new DetailsPage(page, 'http://localhost/models/4/54');
  }

  async clickOnBackToModelButton(){
    await (await this.detailsPage.backToModelButton()).click()
  }

  async getDetailsTable(){
    return await this.detailsPage.detailsTable()
  }

  async clickOnShowBuildLogsButton(){
    await (await this.detailsPage.showBuildLogsButton()).click()
  }

  async clickOnMonitoringButton(){
    await (await this.detailsPage.monitoringButton()).click()
  }

  async getMonitoringButton(){
    return await this.detailsPage.monitoringButton()
  }

  async clickOnCreateApplicationButton(){
    await (await this.detailsPage.createApplicationButton()).click()
  }

  async getCreateApplicationButton(){
    return await this.detailsPage.createApplicationButton()
  }

  async getApplicationTable(){
    return await this.detailsPage.applicationTable()
  }

  async getServablesTable(){
    return await this.detailsPage.servablesTable()
  }

  async getSignaturesTable(){
    return await this.detailsPage.signaturesTable()
  }

  async getMetadataTable(){
    return await this.detailsPage.metadataTable()
  }

  async getDetailsTableListText(selector){
    let table = await this.getDetailsTable()
    let text = await table.$$eval(selector, nodes => nodes.map(n => n.innerText))
    return text
  }

  async getStatusHTML(){
    let table = await this.getDetailsTable()
    return await table.$eval(this.detailsPage.statusSelector, el =>el.innerHTML)
  }

  async getApplicationTableRowsText(){
    let table = await this.getApplicationTable()
    return await table.$eval(this.detailsPage.applicationsRowsSelector, el => el.textContent)
  }

  async getApplicationTableHeaderText(){
    let table = await this.getApplicationTable()
    return await table.$$eval(this.detailsPage.applicationsHeaderSelector, nodes => nodes.map(n => n.innerText))
  }
  async getServablesTableRowsText(){
    let table = await this.getServablesTable()
    return await table.$eval(this.detailsPage.servablesRowsSelector, el => el.textContent)
  }

  async getServablesTableHeaderText(){
    let table = await this.getServablesTable()
    return await table.$$eval(this.detailsPage.servablesHeaderSelector, nodes => nodes.map(n => n.innerText))
  }

  async getServablesTableEmptyText(){
    let table = await this.getServablesTable()
    return (await table.$eval(this.detailsPage.servablesEmptySelector, el => el.textContent)).trim()
  }

  async getSignaturesTableRowsText(){
    let table = await this.getSignaturesTable()
    return  await table.$$eval(this.detailsPage.signaturesRowsSelector, nodes => nodes.map(n => n.innerText))
  }


  async getSignaturesTableHeaderText(){
    let table = await this.getSignaturesTable()
    return await table.$$eval(this.detailsPage.signaturesHeaderSelector, nodes => nodes.map(n => n.innerText))
  }

  async getMetadataTableRowsText(){
    let table = await this.getMetadataTable()
    return  await table.$$eval(this.detailsPage.metadataRowsSelector, nodes => nodes.map(n => n.innerText))
  }

  async getMetadataTableHeaderText(){
    let table = await this.getMetadataTable()
    return  await table.$$eval(this.detailsPage.metadataHeadersSelector, nodes => nodes.map(n => n.innerText))
  }

  async getBranchHeaderFromMetadataTable(){
    let list = await this.getMetadataTableHeaderText()
    return list[0].trim()
  }

  async getEmailHeaderFromMetadataTable(){
    let list = await this.getMetadataTableHeaderText()
    return list[1].trim()
  }

  async getNameHeaderFromMetadataTable(){
    let list = await this.getMetadataTableHeaderText()
    return list[2].trim()
  }

  async getDateHeaderFromMetadataTable(){
    let list = await this.getMetadataTableHeaderText()
    return list[3].trim()
  }

  async getShaHeaderFromMetadataTable(){
    let list = await this.getMetadataTableHeaderText()
    return list[4].trim()
  }

  async getIsDirtyHeaderFromMetadataTable(){
    let list = await this.getMetadataTableHeaderText()
    return list[5].trim()
  }

  async getBranchRowFromMetadataTable(){
    let list = await this.getMetadataTableRowsText()
    return list[0].trim()
  }

  async getEmailRowFromMetadataTable(){
    let list = await this.getMetadataTableRowsText()
    return list[1].trim()
  }

  async getNameRowFromMetadataTable(){
    let list = await this.getMetadataTableRowsText()
    return list[2].trim()
  }

  async getDateRowFromMetadataTable(){
    let list = await this.getMetadataTableRowsText()
    return list[3].trim()
  }

  async getShaRowFromMetadataTable(){
    let list = await this.getMetadataTableRowsText()
    return list[4].trim()
  }

  async getIsDirtyRowFromMetadataTable(){
    let list = await this.getMetadataTableRowsText()
    return list[5].trim()
  }


  async getVersionHeaderFromDetailsTable(){
    let list = await this.getDetailsTableListText(this.detailsPage.detailTableRowsTitleSelector)
    return list[0].trim()
  }

  async getCreatedHeaderFromDetailsTable(){
    let list = await this.getDetailsTableListText(this.detailsPage.detailTableRowsTitleSelector)
    return list[1].trim()
  }

  async getRuntimeHeaderFromDetailsTable(){
    let list = await this.getDetailsTableListText(this.detailsPage.detailTableRowsTitleSelector)
    return list[2].trim()
  }

  async getVersionValueFromDetailsTable(){
    let list = await this.getDetailsTableListText(this.detailsPage.detailTableRowsValueSelector)
    return list[0].trim()
  }

  async getCreatedValueFromDetailsTable(){
    let list = await this.getDetailsTableListText(this.detailsPage.detailTableRowsValueSelector)
    return list[1].trim()
  }

  async getRuntimeValueFromDetailsTable(){
    let list = await this.getDetailsTableListText(this.detailsPage.detailTableRowsValueSelector)
    return list[2].trim()
  }

  async getNameHeaderFromApplicationsTable(){
    let list = await this.getApplicationTableHeaderText()
    return list[0].trim()
  }

  async getStatusHeaderFromApplicationsTable(){
    let list = await this.getApplicationTableHeaderText()
    return list[1].trim()
  }

  async getApplicationsTableEmptyText(){
    let table = await this.getApplicationTable()
    return (await table.$eval(this.detailsPage.applicationsEmptyRowsSelector, el => el.textContent)).trim()
  }

async getNameHeaderFromServablesTable(){
  let list = await this.getServablesTableHeaderText()
  return list[0].trim()
}

  async getStatusHeaderFromServablesTable(){
    let list = await this.getServablesTableHeaderText()
    return list[1].trim()
  }

  async getMessageHeaderFromServablesTable(){
    let list = await this.getServablesTableHeaderText()
    return list[2].trim()
  }

  async getActionsHeaderFromServablesTable(){
    let list = await this.getServablesTableHeaderText()
    return list[3].trim()
  }

  async getInputFieldNameHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[0].trim()
  }

  async getInputDataTypeHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[1].trim()
  }

  async getInputShapeHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[2].trim()
  }

  async getInputProfileHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[3].trim()
  }

  async getOutputFieldNameHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[4].trim()
  }

  async getOutputDataTypeHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[5].trim()
  }

  async getOutputShapeHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[6].trim()
  }

  async getOutputProfileTypeHeaderFromSignaturesTable(){
    let list = await this.getSignaturesTableHeaderText()
    return list[7].trim()
  }

  async getDataRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[0].trim()
  }

  async getWorkclassRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[1].trim()
  }

  async getEducationRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[2].trim()
  }

  async getMaritalStatusRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[3].trim()
  }

  async getOccupationRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[4].trim()
  }

  async getRelationshipRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[5].trim()
  }

  async getRaceRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[6].trim()
  }

  async getSexRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[7].trim()
  }

  async getCapitalGainRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[8].trim()
  }

  async getCapitalLossRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[9].trim()
  }

  async getHoursPerWeekRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[10].trim()
  }

  async getCountryRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[11].trim()
  }

  async getClassedRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[12].trim()
  }

  async getValueRowFromSignaturesTable(){
    let list = await this.getSignaturesTableRowsText()
    return list[13].trim()
  }

  async CheckProfileButtonHTMLSignaturesTable() {
    let table = await this.getSignaturesTable()
    let list =  await table.$$eval(this.detailsPage.signaturesRowsSelector, nodes => nodes.map(n => n.innerHTML))
    return list[0].includes(this.detailsPage.profileButtonSelector)
  }

  async hoverOnVisualizationButton(){
     await (await this.detailsPage.visualizationButton()).hover()
  }

  async hoverOnStatButton(){
    await (await this.detailsPage.statButton()).hover()
  }




  async visualizationTooltipText(){
    let wrapper = await this.detailsPage.tooltipWrapper()
    return await wrapper[0].$eval(this.detailsPage.tooltipSelector,  el =>el.innerText)
  }

  async statTooltipText(){
    let wrapper = await this.detailsPage.tooltipWrapper()
    return await wrapper[1].$eval(this.detailsPage.tooltipSelector,  el =>el.innerText)
  }

  async getLogsText(){
    let logs = await this.detailsPage.logsWindow()
    return  await logs.$eval(this.detailsPage.logsRowsSelector, el =>el.innerText)
  }


}
