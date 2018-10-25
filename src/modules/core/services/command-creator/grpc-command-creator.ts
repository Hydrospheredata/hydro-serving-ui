import { CommandCreator } from './command-creator'
import { Application } from '@shared/_index';
import * as hocon from 'hocon-parser';


export class GrpcCommandCreator implements CommandCreator {
    getCommand(application: Application): string {
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

        const { name: appName, contract, input: appInput } = application;
        const contr = hocon(contract);
        const { inputs } = contr.signatures;
        const type_val = valueAttributes[inputs.dtype];

        let dim= '';
        if(inputs.shape.dim){
          dim = `hs.TensorShapeProto.Dim(size=${inputs.shape.dim.size})`
        }

        let inputKey;
        let inputValue;

        try {
            let parsedObj = JSON.parse(appInput);
            inputKey = Object.keys(parsedObj)[0];
            inputValue = JSON.stringify(parsedObj[inputKey]).replace(/,/g, ', ');
        } catch {
            inputKey = " %your input key% ";
            inputValue = "%your input value% ";
        }

        return `import grpc \n
            import hydro_serving_grpc as hs \n
            channel = grpc.insecure_channel("localhost:8080") \n
            stub = hs.PredictionServiceStub(channel) \n
            model_spec = hs.ModelSpec(name="${appName}", signature_name="${contr.signatures.signature_name}")\n
            tensor_shape = hs.TensorShapeProto(dim=[${dim}])\n
            tensor = hs.TensorProto(dtype=hs.${inputs.dtype}, tensor_shape=tensor_shape, ${type_val}="${inputValue}")\n
            request = hs.PredictRequest(model_spec=model_spec, inputs={"${inputKey}": tensor}) \n
            result = stub.Predict(request) \n`.trim();
    }
}