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
import { Factory } from 'fishery';

export const MockModelSignature = Factory.define<ModelSignature>(() => ({
  signatureName: 'test',
  outputs: [],
  inputs: [],
}));

export const MockModelVersion1Model1 = Factory.define<ModelVersion, ModelSignature>(
  ({ sequence }) => ({
  get contractInputs(): Input[] {
    return [];
  },
  get contractOutputs(): Output[] {
    return [];
  },
  isReleasedAndInternal(): Boolean {
    return true;
  },
  id: sequence,
  image: MockImage.build(),
  created: new Date().toString(),
  finished: new Date().toString(),
  modelVersion: 1,
  modelSignature: MockModelSignature.build(),
  runtime: MockRuntime.build(),
  model: MockModel1.build(),
  status: ModelVersionStatus.Released,
  applications: [],
  metadata: {},
  isExternal: false,
}));

export const MockModelVersion2Model1 = MockModelVersion1Model1.build({
  modelVersion: 2,
  runtime: MockRuntime3,
  applications: ['app1', 'app2'],
});

export const MockModelVersion3Model2 = MockModelVersion1Model1.build({
  runtime: MockRuntime2,
  model: MockModel2,
  applications: ['app1', 'app2'],
});

export const FailedModelVersion = MockModelVersion1Model1.build({
  runtime: MockRuntime2,
  model: MockModel2,
  status: ModelVersionStatus.Failed,
});

export const AssemblingModelVersion = MockModelVersion1Model1.build({
  runtime: MockRuntime2,
  model: MockModel2,
  status: ModelVersionStatus.Assembling,
});
