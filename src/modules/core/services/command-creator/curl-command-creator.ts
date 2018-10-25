import { CommandCreator } from './command-creator'
import { Application } from '@shared/_index';
import { environment } from '@environments/environment.prod';

export class CurlCommandCreator implements CommandCreator {
    getCommand(application: Application): string {
        const { host , port, apiUrl } = environment;
        const headers = `--header 'Content-Type: application/json' --header 'Accept: application/json'`
        const { input, id, name } = application;
        const url: string = `${host}:${port}${apiUrl}/applications/serve/${id}/${name}`;

        return `curl -X POST ${headers} -d '${this.removeNewLineSymbolsFromString(input)}' '${url}'`.trim();
    }

    private removeNewLineSymbolsFromString(str: string = '') : string {
        if(str === null) { return ''};

        return str.replace(/[\r\n]+/g, ' ');
    }
}