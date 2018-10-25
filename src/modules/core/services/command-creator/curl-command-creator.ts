import { CommandCreator } from './command-creator'
import { Application } from '@shared/_index';
import { environment } from '@environments/environment';

export class CurlCommandCreator implements CommandCreator {
    get apiUrl(){
        const { apiUrl } = environment;

        if(environment.production){
            const { protocol, hostname, port } = window.location;

            return `${protocol}//${hostname}:${port}${apiUrl}`
        } else {
            return `${environment.host}:${environment.port}${apiUrl}`
        }
    }

    getCommand(application: Application): string {
        
        const headers = `--header 'Content-Type: application/json' --header 'Accept: application/json'`
        const { input, id, name } = application;
        const url: string = `${this.apiUrl}/applications/serve/${id}/${name}`;

        return `curl -X POST ${headers} -d '${this.removeNewLineSymbolsFromString(input)}' '${url}'`.trim();
    }

    private removeNewLineSymbolsFromString(str: string = '') : string {
        if(str === null) { return ''};

        return str.replace(/[\r\n]+/g, ' ');
    }
}