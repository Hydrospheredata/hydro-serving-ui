import {
  ModelVersion,
  ModelVersionStatus,
  ModelSignature,
  Input,
  Output,
} from '@app/core/data/types';
import { MockImage } from '@testing/factories/image';
import { MockModel1, MockModel2 } from '@testing/factories/model';
import {
  MockRuntime,
  MockRuntime3,
  MockRuntime2,
} from '@testing/factories/runtime';

export const MockModelSignature: ModelSignature = {
  signatureName: 'test',
  outputs: [],
  inputs: [],
};

export const MockModelVersion1Model1: ModelVersion = {
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  isReleasedAndInternal(): Boolean {
    return true;
  },
  id: 1,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelSignature: MockModelSignature,
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
  isReleasedAndInternal(): Boolean {
    return true;
  },
  id: 2,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 2,
  modelSignature: MockModelSignature,
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
  isReleasedAndInternal(): Boolean {
    return true;
  },
  id: 3,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelSignature: MockModelSignature,
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
  isReleasedAndInternal(): Boolean {
    return true;
  },
  id: 4,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelSignature: MockModelSignature,
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
  isReleasedAndInternal(): Boolean {
    return true;
  },
  id: 5,
  image: MockImage,
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelSignature: MockModelSignature,
  runtime: MockRuntime2,
  model: MockModel2,
  status: ModelVersionStatus.Assembling,
  applications: [],
  metadata: {},
  isExternal: false,
};
