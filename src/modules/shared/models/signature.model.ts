export class Signature {

    public signatureName: string;
    public inputs: Array<{ fieldName: string, dataType: string, shape?: number[] }>;
    public outputs: Array<{ fieldName: string, dataType: string, shape?: number[] }>;

    constructor(props: any = {}) {
        this.signatureName = props.signatureName;
        this.inputs = props.inputs;
        this.outputs = props.outputs;
    }
}
