const url = process.env.URL || 'http://localhost';
const modelPageUrl = 'http://localhost/models/infer';
const modelVersionPageUrl = 'http://localhost/models/infer/1';
const applicationsUrl = 'http://localhost/applications';
const deploymentConfigsUrl = 'http://localhost/deployment_configs';
const apiVersion = 2;
const api = `api/v${apiVersion}`;

export default {
  url,
  modelPageUrl,
  modelVersionPageUrl,
  applicationsUrl,
  deploymentConfigsUrl,
  api,
  apiVersion,
  endpoints: ['model/version', 'application', 'deployment_configuration'],
};
