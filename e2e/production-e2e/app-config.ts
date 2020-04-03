const url = process.env.URL || 'http://localhost';

export default {
  url,
  apiVersion: 2,
  endpoints: ['model', 'model/version', 'application', 'servable'],
};
