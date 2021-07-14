import { chromium, firefox, webkit, devices } from 'playwright';

module.exports = {
  browserType: chromium,
  launchConfig: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  },
  contextConfig: {
  },
  baseURL: 'http://localhost/'
};
