interface IDim {
    size: number;
    name: string;
}

export interface IShape {
    dims: IDim[];
    unknownRank?: boolean;
}
export interface IField {
    profile: string;
    dtype?: string;
    name?: string;
    shape?: IShape;
    subfields?: IField[];
}

export interface ISignature {
    signatureName: string;
    inputs: IField[];
    outputs: IField[];
}

export class Signature implements ISignature {
    public signatureName: string;
    public inputs: IField[];
    public outputs: IField[];

    constructor(props: any = {}) {
        this.signatureName = props.signatureName;
        this.inputs = props.inputs;
        this.outputs = props.outputs;
    }
}
