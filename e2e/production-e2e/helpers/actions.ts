import { Page } from 'playwright';

export class ActionsHelper {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeApplication() {
    let createDialog = await this.page.$('.dialog__container');
    let createDialogContent = await createDialog.$('.dialog__content');
    let createDialogButtons = await createDialogContent.$('.dialog__buttons');
    let removeApplicationButton = await createDialogButtons.$('.hs-button--flat-warning');

    await removeApplicationButton.click();
  }
}

