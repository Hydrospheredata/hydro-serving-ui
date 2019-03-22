import { IField, ISignature } from '@shared/_index';

const SimpleInput: IField = {
    profile: 'TEXT',
    name: 'simple_input_1',
    dtype: 'DTYPE',
    shape: {
        dim: [{ size: 1, name: 'DIM' }],
    },
};

const SimpleOutput: IField = {
    profile: 'TEXT',
    name: 'simple_output_1',
    dtype: 'DTYPE',
    shape: {
        dim: [{ size: 1, name: 'DIM' }],
    },
};

const SimpleInput2: IField = {
    profile: 'TEXT',
    name: 'simple_input_2',
    dtype: 'DTYPE',
    shape: {
        dim: [{ size: 1, name: 'DIM' }, { size: 2, name: 'DIM' }],
    },
};

const CompositeSignature = {
    subfields: [
        SimpleInput,
        SimpleInput2,
    ],
};

export const MockSignature1: ISignature = {
    signatureName: 'signature_1',
    inputs: [SimpleInput],
    outputs: [SimpleOutput],
};

export const MockSignature2: ISignature = {
    signatureName: 'signature_2',
    inputs: [SimpleInput2],
    outputs: [{profile: 'TEXT', name: 'output_2'}],
};

export const MockCompositeSignature  = {
    signatureName: 'composite_signature_1',
    inputs: [CompositeSignature],
    outputs: [{ name: 'output_1'}],
};
