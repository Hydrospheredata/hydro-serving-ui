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

export interface ModelContractDTO {
  modelName: string;
  predict: {
    outputs: Output[];
    signatureName: string;
    inputs: Input[];
  };
}

export class ModelContract {
  readonly modelName: string;
  readonly predict: {
    outputs: Output[];
    signatureName: string;
    inputs: Input[];
  };

  constructor(params: ModelContractDTO) {
    this.modelName = params.modelName;
    this.predict = params.predict;
  }

  get inputs(): Input[] {
    return this.predict.inputs;
  }

  get outputs(): Output[] {
    return this.predict.outputs;
  }
}
