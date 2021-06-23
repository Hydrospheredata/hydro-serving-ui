import { Application } from '@app/core/data/types';
import { CommandCreator } from './command-creator';

export class CurlCommandCreator extends CommandCreator {
  private static removeNewLineSymbolsFromString(str: string = ''): string {
    return str === null ? '' : str.replace(/[\r\n]+/g, ' ');
  }
  readonly headers: string = `--header 'Content-Type: application/json' --header 'Accept: application/json'`;

  constructor(private url: string) {
    super();
  }

  getCommand(application: Application, input: string): string {
    try {
      const { name } = application;

      return `curl -X POST ${
        this.headers
      } -d '${CurlCommandCreator.removeNewLineSymbolsFromString(input)}' '${
        this.url
      }gateway/application/${name}'`.trim();
    } catch (err) {
      return 'invalid contract';
    }
  }
}
