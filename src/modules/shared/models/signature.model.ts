export class Signature {

    public signatureName: string;
    public inputs: { fieldName: string, dataType: string, shape?: number[] }[];
    public outputs: { fieldName: string, dataType: string, shape?: number[] }[];

    constructor(props: any = {}) {
        this.signatureName = props['signatureName'];
        this.inputs = props['inputs'];
        this.outputs = props['outputs'];
    }
}

