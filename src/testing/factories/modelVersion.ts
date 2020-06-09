import { ModelVersion, ModelVersionStatus } from '@shared/_index';
import { ModelContract, Input, Output } from '@shared/interfaces';
import { MockImage } from '@testing/factories/image';
import { MockModel1, MockModel2 } from '@testing/factories/model';
import { MockRuntime, MockRuntime3, MockRuntime2 } from '@testing/factories/runtime';

export const MockModelContract: ModelContract = {
  get inputs(): Input[] {
    return [];
  },
  get outputs(): Output[] {
    return [];
  },
  predict: { inputs: [], outputs: [], signatureName: '' },
  modelName: 'ModelName',
};

export const MockModelVersion1Model1: ModelVersion = {
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  id: 1,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelContract: MockModelContract,
  runtime: MockRuntime,
  model: MockModel1,
  status: ModelVersionStatus.Released,
  applications: [],
  metadata: {},
  isExternal: false,
};

export const MockModelVersion2Model1: ModelVersion = {
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  id: 2,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 2,
  modelContract: MockModelContract,
  runtime: MockRuntime3,
  model: MockModel1,
  status: ModelVersionStatus.Released,
  applications: ['app1', 'app2'],
  metadata: {},
  isExternal: false,
};

export const MockModelVersion3Model2: ModelVersion = {
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  id: 3,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelContract: MockModelContract,
  runtime: MockRuntime2,
  model: MockModel2,
  status: ModelVersionStatus.Released,
  applications: ['app1', 'app2'],
  metadata: {},
  isExternal: false,
};

export const FailedModelVersion: ModelVersion = {
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  id: 4,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelContract: MockModelContract,
  runtime: MockRuntime2,
  model: MockModel2,
  status: ModelVersionStatus.Failed,
  applications: [],
  metadata: {},
  isExternal: false,
};

export const AssemblingModelVersion: ModelVersion = {
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  id: 5,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelContract: MockModelContract,
  runtime: MockRuntime2,
  model: MockModel2,
  status: ModelVersionStatus.Assembling,
  applications: [],
  metadata: {},
  isExternal: false,
};
