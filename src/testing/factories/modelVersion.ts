import {
  ModelVersion,
  ModelContract,
  ModelVersionStatus,
} from '@shared/_index';
import { MockHostSelector } from '@testing/factories/hostSelector';
import { MockImage } from '@testing/factories/image';
import { MockModel1, MockModel2 } from '@testing/factories/model';
import {
  MockRuntime,
  MockRuntime3,
  MockRuntime2,
} from '@testing/factories/runtime';
import { MockSignature1, MockSignature2 } from '@testing/factories/signature';

export const MockModelContract: ModelContract = {
  modelName: 'ModelName',
  predict: MockSignature1,
};

export const MockModelVersion1Model1: ModelVersion = {
  id: 1,
  image: MockImage,
  created: new Date(),
  finished: new Date(),
  modelVersion: 1,
  modelContract: { modelName: 'ModelName', predict: MockSignature1 },
  runtime: MockRuntime,
  model: MockModel1,
  hostSelector: MockHostSelector,
  status: ModelVersionStatus.Released,
  applications: [],
  metadata: {},
  isExternal: false,
};

export const MockModelVersion2Model1: ModelVersion = {
  id: 2,
  image: MockImage,
  created: new Date(),
  finished: new Date(),
  modelVersion: 2,
  modelContract: { modelName: 'ModelName', predict: MockSignature1 },
  runtime: MockRuntime3,
  model: MockModel1,
  hostSelector: MockHostSelector,
  status: ModelVersionStatus.Released,
  applications: ['app1', 'app2'],
  metadata: {},
  isExternal: false,
};

export const MockModelVersion3Model2: ModelVersion = {
  id: 3,
  image: MockImage,
  created: new Date(),
  finished: new Date(),
  modelVersion: 1,
  modelContract: { modelName: 'ModelName', predict: MockSignature2 },
  runtime: MockRuntime2,
  model: MockModel2,
  hostSelector: MockHostSelector,
  status: ModelVersionStatus.Released,
  applications: ['app1', 'app2'],
  metadata: {},
  isExternal: false,
};

export const FailedModelVersion: ModelVersion = {
  id: 4,
  image: MockImage,
  created: new Date(),
  finished: new Date(),
  modelVersion: 1,
  modelContract: { modelName: 'ModelName', predict: MockSignature2 },
  runtime: MockRuntime2,
  model: MockModel2,
  hostSelector: MockHostSelector,
  status: ModelVersionStatus.Failed,
  applications: [],
  metadata: {},
  isExternal: false,
};

export const AssemblingModelVersion: ModelVersion = {
  id: 5,
  image: MockImage,
  created: new Date(),
  finished: new Date(),
  modelVersion: 1,
  modelContract: { modelName: 'ModelName', predict: MockSignature2 },
  runtime: MockRuntime2,
  model: MockModel2,
  hostSelector: MockHostSelector,
  status: ModelVersionStatus.Assembling,
  applications: [],
  metadata: {},
  isExternal: false,
};
