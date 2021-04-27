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

const applicationBuilder = new ApplicationBuilder();
export const application: Application = applicationBuilder.build({});

const MockService: IModelVariant = {
  weight: 100,
  modelVersion: MockModelVersion1Model1,
};

const MockService2: IModelVariant = {
  weight: 100,
  modelVersion: MockModelVersion3Model2,
};

export const MockApplication: Application = {
  id: 1,
  signature: MockSignature1,
  name: 'app1',
  executionGraph: {
    stages: [
      {
        modelVariants: [MockService],
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
};
