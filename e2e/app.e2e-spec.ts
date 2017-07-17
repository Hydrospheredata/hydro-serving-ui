import { HydroUiPage } from './app.po';

describe('hydro-ui App', () => {
  let page: HydroUiPage;

  beforeEach(() => {
    page = new HydroUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
