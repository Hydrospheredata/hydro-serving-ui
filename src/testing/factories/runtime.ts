import { Runtime } from '@app/core/data/types';
import { Factory } from 'fishery';

export const MockRuntime = Factory.define<Runtime>(() => ({
  name: 'mockRuntime',
  tag: 'mockRuntimeTag',
  sha256: 'mockRuntimeSha256',
}));

export const MockRuntime2 = MockRuntime.build({ name: 'mockRuntime2' });

export const MockRuntime3 = MockRuntime.build({ name: 'mockRuntime3' });
