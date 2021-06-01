import { ApplicationBuilder } from '@app/core/data/builders/application.builder';
import {
  Application,
  IModelVariant,
  TestStatus,
  ApplicationStatus,
} from '@app/core/data/types';
import {
  MockModelVersion1Model1,
  MockModelVersion3Model2,
} from '@testing/factories/modelVersion';
import { MockSignature1 } from '@testing/factories/signature';
import { MockDeploymentConfig1 } from '@testing/factories/deployment-config';
import { Factory } from 'fishery';

const applicationBuilder = new ApplicationBuilder();
export const application: Application = applicationBuilder.build({});

const MockService = Factory.define<IModelVariant>(() => ({
  weight: 100,
  modelVersion: MockModelVersion1Model1.build(),
}));

const MockService2 = MockService.build({
  modelVersion: MockModelVersion3Model2,
});

export const MockApplication = Factory.define<Application>(({ sequence }) => ({
  id: sequence,
  signature: MockSignature1.build(),
  name: 'app1',
  executionGraph: {
    stages: [
      {
        modelVariants: [MockService.build()],
        signature: 'signature',
      },
      {
        modelVariants: [MockService2],
        signature: 'signature',
      },
    ],
  },
  namespace: 'namespace',
  input: '',
  output: '',
  testStatus: TestStatus.Undefined,
  error: '',
  kafkaStreaming: [],
  status: ApplicationStatus.Ready,
  favorite: false,
  deploymentConfiguration: MockDeploymentConfig1.build(),
}));
