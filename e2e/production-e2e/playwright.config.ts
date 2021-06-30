import { chromium, firefox, webkit, devices } from 'playwright';

module.exports = {
  browserType: chromium,
  launchConfig: {
    headless: false,
    slowMo: 10
  },
  contextConfig: {
  },
  baseURL: 'http://localhost/'
};
