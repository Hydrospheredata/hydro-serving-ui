export interface Input {
  profile: string;
  dtype: string;
  name: string;
  shape: {
    dim: any[];
    unknownRank: boolean;
  };
}

export interface Output {
  profile: string;
  dtype: string;
  name: string;
  shape: {
    dim: any[];
    unknownRank: boolean;
  };
}

export interface ModelSignatureDTO {
  outputs: Output[];
  signatureName: string;
  inputs: Input[];
}

export class ModelSignature {
  signatureName: string;
  outputs: Output[];
  inputs: Input[];

  constructor(params: ModelSignatureDTO) {
    this.signatureName = params.signatureName;
    this.outputs = params.outputs;
    this.inputs = params.inputs;
  }
}
