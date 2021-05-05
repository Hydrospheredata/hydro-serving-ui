import { DeploymentConfig } from '@app/core/data/types';

export const MockDeploymentConfig1: DeploymentConfig = {
  name: 'test1',
  container: null,
  pod: null,
  deployment: null,
  hpa: {
    minReplicas: 2,
    maxReplicas: 10,
    cpuUtilization: 80
  }
}

export const MockDeploymentConfig2: DeploymentConfig = {
  name: 'hydrosphere_manager_default',
  container: null,
  pod: null,
  deployment: null,
  hpa: {
    minReplicas: 2,
    maxReplicas: 10,
    cpuUtilization: 80
  }
}

