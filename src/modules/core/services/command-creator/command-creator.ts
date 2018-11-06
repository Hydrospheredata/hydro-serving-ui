import { Application } from "@shared/_index";
import * as hocon from 'hocon-parser';

export interface IContractInputsShape {
    dim?: {
        name: string,
        size: number
    },
    unknown_rank: boolean
}
export interface IContractInputs {
    dtype: string;
    name: string;
    shape?: IContractInputsShape
}

export interface IContractOutputs {
    dtype: string;
    name: string;
}

export interface IApplicationContractSignatures {
    inputs: any;
    outputs: any;
    signature_name: string;
}
export interface IApplicationContract {
    model_name: string;
    signatures: IApplicationContractSignatures;
}
export abstract class CommandCreator {
    abstract getCommand(application: Application): string;

    protected getApplicationContract({contract}: Application): IApplicationContract {
        return hocon(contract);
    }
}
