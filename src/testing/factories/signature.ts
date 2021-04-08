import { IField, ISignature } from '@app/core/data/types';

const SimpleInput: IField = {
  profile: 'TEXT',
  name: 'simple_input_1',
  dtype: 'DTYPE',
  shape: {
    dims: [{ size: 1, name: 'DIM' }],
  },
};

const SimpleOutput: IField = {
  profile: 'TEXT',
  name: 'simple_output_1',
  dtype: 'DTYPE',
  shape: {
    dims: [{ size: 1, name: 'DIM' }],
  },
};

const SimpleInput2: IField = {
  profile: 'TEXT',
  name: 'simple_input_2',
  dtype: 'DTYPE',
  shape: {
    dims: [
      { size: 1, name: 'DIM' },
      { size: 2, name: 'DIM' },
    ],
  },
};

const CompositeSignature = {
  subfields: [SimpleInput, SimpleInput2],
};

export const MockSignature1: ISignature = {
  signatureName: 'signature_1',
  inputs: [SimpleInput],
  outputs: [SimpleOutput],
};

export const MockCompositeSignature = {
  signatureName: 'composite_signature_1',
  inputs: [CompositeSignature],
  outputs: [{ name: 'output_1' }],
};
