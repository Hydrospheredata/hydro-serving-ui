// @ts-ignore
import {browserType, launchConfig, contextConfig, baseURL} from '../playwright.config';
import * as playwright from 'playwright-core';
const rootSelector = '#root';
let browser, context, page;
const WIDTH = 1920;
const HEIGHT = 1080;

export class BaseHelper {


  root = async () => await page.$(rootSelector);



  close = async () => await browser.close();


  getTitle = async () => await page.title();



  async createBrowser(): Promise<playwright.Browser> {
    browser = await browserType.launch(launchConfig);
    return browser
  }




  async createPage(browser: playwright.Browser): Promise<playwright.Page> {
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.setViewportSize({ width: WIDTH, height: HEIGHT });
    return page;
  }



}
