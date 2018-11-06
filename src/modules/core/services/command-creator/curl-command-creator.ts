import { CommandCreator, IApplicationContract } from './command-creator'
import { Application } from '@shared/_index';
import { environment } from '@environments/environment';

export class CurlCommandCreator extends CommandCreator {
    get apiUrl(){
        if(environment.production){
            const { protocol, hostname } = window.location;
            return `${protocol}//${hostname}`
        } else {
            return `${environment.host}`
        }
    }

    getCommand(application: Application): string {
        const headers = `--header 'Content-Type: application/json' --header 'Accept: application/json'`
        const { input, name } = application;
        const contract: IApplicationContract = this.getApplicationContract(application);
        const url: string = `${this.apiUrl}/gateway/applications/${name}/${contract.signatures.signature_name}`;

        return `curl -X POST ${headers} -d '${this.removeNewLineSymbolsFromString(input)}' '${url}'`.trim();
    }

    private removeNewLineSymbolsFromString(str: string = '') : string {
        if(str === null) { return ''};

        return str.replace(/[\r\n]+/g, ' ');
    }
}