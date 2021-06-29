const url = process.env.URL || 'http://localhost';
const modelPageUrl = 'http://localhost/models/infer';
const modelVersionPageUrl = 'http://localhost/models/infer/1';
const applicationsUrl = 'http://localhost/applications';
const deploymentConfigsUrl = 'http://localhost/deployment_configs';

export default {
  url,
  modelPageUrl,
  modelVersionPageUrl,
  applicationsUrl,
  deploymentConfigsUrl,
  apiVersion: 2,
  endpoints: ['model/version', 'application', 'deployment_configuration'],
};
