import { IField, ISignature } from '@app/core/data/types';
import { Factory } from 'fishery';

const SimpleInput = Factory.define<IField>(() => ({
  profile: 'TEXT',
  name: 'simple_input_1',
  dtype: 'DTYPE',
  shape: {
    dims: [{ size: 1, name: 'DIM' }],
  },
}));

const SimpleOutput = Factory.define<IField>(() => ({
  profile: 'TEXT',
  name: 'simple_output_1',
  dtype: 'DTYPE',
  shape: {
    dims: [{ size: 1, name: 'DIM' }],
  },
}));

const SimpleInput2 = SimpleInput.build({
  name: 'simple_input_2',
  shape: {
    dims: [
      { size: 1, name: 'DIM' },
      { size: 2, name: 'DIM' },
    ],
  },
});

const CompositeSignature = {
  subfields: [SimpleInput, SimpleInput2],
};

export const MockSignature1 = Factory.define<ISignature>(() => ({
  signatureName: 'signature_1',
  inputs: [SimpleInput.build()],
  outputs: [SimpleOutput.build()],
}));

export const MockCompositeSignature = Factory.define(() => ({
  signatureName: 'composite_signature_1',
  inputs: [CompositeSignature],
  outputs: [{ name: 'output_1' }],
}));
