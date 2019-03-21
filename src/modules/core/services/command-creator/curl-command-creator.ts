import { environment } from '@environments/environment';
import { Application } from '@shared/_index';
import { CommandCreator } from './command-creator';

export class CurlCommandCreator extends CommandCreator {
    readonly headers: string = `--header 'Content-Type: application/json' --header 'Accept: application/json'`;

    get apiUrl(): string {
        if (environment.production) {
            const { protocol, hostname } = window.location;
            return `${protocol}//${hostname}`;
        } else {
            return `${environment.host}`;
        }
    }

    getCommand(application: Application): string {
        try {
            const { input, name, signature } = application;
            const url: string = `${this.apiUrl}/gateway/application/${name}`;
            return `curl -X POST ${this.headers} -d '${this.removeNewLineSymbolsFromString(input)}' '${url}'`.trim();
        } catch (err) {
            return 'invalid contract';
        }
    }

    private removeNewLineSymbolsFromString(str: string = ''): string {
        if (str === null) { return ''; }

        return str.replace(/[\r\n]+/g, ' ');
    }
}
