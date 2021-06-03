import { BaseHelper } from './base.helper';
import {ModelsPage} from '../pageObjects/models.page';
import * as playwright from 'playwright-core';
export class ModelsHelper extends BaseHelper{
  private readonly modelsPage: ModelsPage;
constructor(page: playwright.Page) {
  super();
  this.modelsPage = new ModelsPage(page, 'http://localhost/');
}

  async fillSearchField(text){
  await (await this.modelsPage.searchField()).fill(text)
  }

  async clickOnSideBarModel(model){
    await (await this.modelsPage.sidebarModel(model)).click()
  }

  async getModelsTable(){
    return await this.modelsPage.modelsTable()
  }

  async getModelsSidebar(){
    return await this.modelsPage.sidebarModels()
  }

  async getModelSidebar(model){
    return await this.modelsPage.sidebarModel(model)
  }

  async getTableHeaderText(){
    let table = await this.getModelsTable()
    return await table.$eval(this.modelsPage.modelsTableHeaderSelector, el => el.textContent)
  }

  async getTableRowText(){
    let table = await this.getModelsTable()
    return await table.$eval(this.modelsPage.modelsTableRowSelector, el => el.textContent)
  }

  async getReleaseStatusHTML(){
    let table = await this.getModelsTable()
    return await table.$eval(this.modelsPage.releaseStatusSelector, el =>el.innerHTML)
  }


  async getDetailsButton(){
    return (await this.modelsPage.detailsButton())
  }

  async getMonitoringButton(){
    return (await this.modelsPage.monitoringButton())
  }

  async clickOnDetailsButton(){
    return (await this.modelsPage.detailsButton()).click()
  }

  async clickOnMonitoringButton(){
    return (await this.modelsPage.monitoringButton()).click()
  }

  async getSideBarText(model){
    let sidebar = await this.getModelsSidebar()
    return await sidebar.$eval('text='+model, el => el.textContent)
  }



  async getSidebarListText(){
  let sidebar = await this.getModelsSidebar()
    let sidebarText = await sidebar.$$eval(this.modelsPage.modelSidebarSelector, nodes => nodes.map(n => n.innerText))
    return sidebarText
  }
  async getSidebarSelectedItemAttribute() {
    let sidebar = await this.getModelsSidebar()
    let text = await sidebar.$eval(this.modelsPage.selectedModelSidebarSelector, el => el.textContent)
    return text
  }

  async getVersion(){
    let table = await this.getModelsTable()
    return await table.$eval(this.modelsPage.versionColumnSelector, el => el.textContent)
  }

  async getRuntime(){
    let table = await this.getModelsTable()
    let tag= await table.$eval(this.modelsPage.runtimeTagColumnSelector, el => el.textContent)
    let runtime = await table.$eval(this.modelsPage.runtimeColumnSelector, el => el.textContent)
    return runtime.trim() + " " + tag.trim()
  }

  async getApplication(){
    let table = await this.getModelsTable()
    return (await table.$eval(this.modelsPage.applicationColumnSelector, el => el.textContent)).trim()
  }
  async getCreated(){
    let table = await this.getModelsTable()
    return await table.$eval(this.modelsPage.createdColumnSelector, el => el.textContent)
  }


}
