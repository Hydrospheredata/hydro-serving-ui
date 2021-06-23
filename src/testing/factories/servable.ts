import { Servable } from '@app/core/data/types';
import { of } from 'rxjs';
import { MockDeploymentConfig1 } from '@testing/factories/deployment-config';
import { Factory } from 'fishery';

export const MockServable = Factory.define<Servable>(() => ({
  modelVersionId: 1,
  fullName: 'test',
  name: 'test',
  status: 'Serving',
  statusMessage: '',
  message: '',
  logStream: of(),
  deploymentConfiguration: MockDeploymentConfig1.build(),
}));
