import { DeploymentConfig } from '@app/core/data/types';
import { Factory } from 'fishery';

export const MockDeploymentConfig1 = Factory.define<DeploymentConfig>(() => ({
  name: 'test1',
  container: null,
  pod: null,
  deployment: null,
  hpa: {
    minReplicas: 2,
    maxReplicas: 10,
    cpuUtilization: 80,
  },
  favorite: false,
}));

export const MockDeploymentConfig2 = MockDeploymentConfig1.build({
  name: 'hydrosphere_manager_default',
});
