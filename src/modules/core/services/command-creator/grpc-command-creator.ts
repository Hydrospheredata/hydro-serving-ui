import { Application } from '@shared/_index';
import { CommandCreator, IApplicationContract } from './command-creator';

export class GrpcCommandCreator extends CommandCreator {

    private contract: IApplicationContract;

    private valueAttributes: { [propName: string]: string } = {
            DT_HALF : 'half_val',
            DT_FLOAT : 'float_val',
            DT_DOUBLE : 'double_val',
            DT_INT32 : 'int_val',
            DT_INT16 : 'int_val',
            DT_INT8 : 'int_val',
            DT_UINT8 : 'int_val',
            DT_UINT32 : 'uint32_val',
            DT_UINT64 : 'uint64_val',
            DT_STRING : 'string_val',
            DT_COMPLEX64 : 'complex_val',
            DT_INT64 : 'int64_val',
            DT_BOOL : 'bool_val',
            DT_COMPLEX128 : 'dcomplex_val',
            DT_VARIANT : 'variant_val',
    };

    getCommand(application: Application): string {
        const { name: appName, input: appInput } = application;

        this.contract = this.getApplicationContract(application);

        const dtype = this.getDtype();
        const typeVal = this.getTypeVal(dtype);
        const { inputKey, inputValue} = this.getInputKeyValue(appInput);

        return `import grpc \n
            import hydro_serving_grpc as hs \n
            channel = grpc.insecure_channel("localhost") \n
            stub = hs.PredictionServiceStub(channel) \n
            model_spec = hs.ModelSpec(name="${appName}", signature_name="${this.getSignatureName()}")\n
            tensor_shape = hs.TensorShapeProto(dim=[hs.TensorShapeProto.Dim(size=${this.getDimSize()})]\n
            tensor = hs.TensorProto(dtype=hs.${dtype}, tensor_shape=tensor_shape, ${typeVal}=${inputValue})\n
            request = hs.PredictRequest(model_spec=model_spec, inputs={"${inputKey}": tensor}) \n
            result = stub.Predict(request) \n
            `.trim();
    }

    private getDimSize(): string {
        try {
            return `${this.contract.signatures.inputs.shape.dim.size}`;
        } catch {
            return ` %dim size% `;
        }
    }

    private getTypeVal(dtype: string): string {
        return this.valueAttributes[dtype] || '';
    }

    private getInputKeyValue(appInput: string): {inputKey: string, inputValue: string} {
        try {
            const parsedObj = JSON.parse(appInput);
            const inputKey = Object.keys(parsedObj)[0];
            const inputValue = JSON.stringify(parsedObj[inputKey]).replace(/,/g, ', ');

            return { inputKey, inputValue };
        } catch {
            return {inputKey: ' %input key% ', inputValue: '%input value% '};
        }
    }

    private getSignatureName(): string {
        try {
            return this.contract.signatures.signature_name;
        } catch {
            return ``;
        }
    }

    private getDtype(): string {
        try {
            return this.contract.signatures.inputs.dtype;
        } catch {
            return ``;
        }
    }
}
