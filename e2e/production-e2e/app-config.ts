const url = process.env.URL || 'http://localhost';
const modelPageUrl = url + '/models/census';
const modelVersionPageUrl = url + '/models/census/1';
const applicationsUrl = url + '/applications';
const deploymentConfigsUrl = url + '/deployment_configs';
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
