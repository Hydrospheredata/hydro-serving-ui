import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Application } from '@shared/models/_index';
import { environment } from '@environments/environment.prod';
import * as hocon from 'hocon-parser';

@Component({
    selector: 'hydro-command-template',
    templateUrl: './command-template.component.html',
    styleUrls: ['./command-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandTemplateComponent implements OnInit, OnChanges {
    @Input() application: Application;
    @Input() type: string;
    @Input() isValidInput: boolean = true;

    public codeExample: string;

    public isGrpc(): boolean {
        return this.type === "grpc";
    }

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges(): void {
        this.createCodeExample();
    }

    private createCodeExample(): void {
        switch(this.type){
            case "curl":
                this.codeExample = this.createCurlTemplate();
                break;
            case "grpc":
                this.codeExample = this.createGrpcTemplate();
                break;
            default:
                this.codeExample = "";
        }
    };

    private createCurlTemplate(): string {
        const { host , port, apiUrl } = environment;
        const headers = `--header 'Content-Type: application/json' --header 'Accept: application/json'`
        const { input, id, name } = this.application;
        const url = `${host}:${port}${apiUrl}/applications/serve/${id}/${name}`;

        return `curl -X POST ${headers} -d '${this.removeNewLineSymbolsFromString(input)}' '${url}'`.trim();
    }

    //TODO protoc format
    private createGrpcTemplate(): string {
        const valueAttributes = {
            DT_HALF : "half_val",
            DT_FLOAT : "float_val",
            DT_DOUBLE : "double_val",
            DT_INT32 : "int_val",
            DT_INT16 : "int_val",
            DT_INT8 : "int_val",
            DT_UINT8 : "int_val",
            DT_UINT32 : "uint32_val",
            DT_UINT64 : "uint64_val",
            DT_STRING : "string_val",
            DT_COMPLEX64 : "complex_val",
            DT_INT64 : "int64_val",
            DT_BOOL : "bool_val",
            DT_COMPLEX128 : "dcomplex_val",
            DT_VARIANT : "variant_val"
        }

        const { name: appName, contract, input: appInput } = this.application;
        const contr = hocon(contract);
        const { inputs } = contr.signatures;
        const type_val = valueAttributes[inputs.dtype];

        let inputKey;
        let inputValue;

        try {
            let parsedObj = JSON.parse(appInput);
            inputKey = Object.keys(parsedObj)[0];
            inputValue = JSON.stringify(parsedObj[inputKey]).replace(/,/g, ', ');
        } catch {
            inputKey = " %your input key% ";
            inputValue = "%yout input value% ";
        }

        return `import grpc \n
            import hydro_serving_grpc as hs \n
            channel = grpc.insecure_channel("localhost:8080") \n
            stub = hs.PredictionServiceStub(channel) \n
            model_spec = hs.ModelSpec(name="${appName}", signature_name="${contr.signatures.signature_name}")\n
            tensor_shape = hs.TensorShapeProto(dim=[hs.TensorShapeProto.Dim(size=${contr.signatures.inputs.shape.dim.size})])\n
            tensor = hs.TensorProto(dtype=hs.${inputs.dtype}, tensor_shape=tensor_shape, ${type_val}="${inputValue}")\n
            request = hs.PredictRequest(model_spec=model_spec, inputs={"${inputKey}": tensor}) \n
            result = stub.Predict(request) \n`.trim();
    }

    private removeNewLineSymbolsFromString(str: string = '') : string {
        if(str === null) { return ''};

        return str.replace(/[\r\n]+/g, ' ');
    }
}
