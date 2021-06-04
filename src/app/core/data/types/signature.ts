interface Dim {
    size: number;
    name: string;
}

export interface Shape {
    dims: Dim[];
    unknownRank?: boolean;
}
export interface Field {
    profile: string;
    dtype?: string;
    name?: string;
    shape?: Shape;
    subfields?: Field[];
}

export class Signature {
    public signatureName: string;
    public inputs: Field[];
    public outputs: Field[];

    constructor(props: any = {}) {
        this.signatureName = props.signatureName;
        this.inputs = props.inputs;
        this.outputs = props.outputs;
    }
}
