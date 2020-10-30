import { environment } from '@environments/environment';
import { Application } from '@shared/_index';
import { CommandCreator } from './command-creator';

export class GrpcCommandCreator extends CommandCreator {

    get apiUrl(): { protocol: string, hostname: string } {
        if (environment.production) {
          const { protocol, hostname } = window.location;
          return { protocol, hostname };
        } else {
          const url = new URL(environment.host);
          return { 'protocol': url.protocol, 'hostname': url.hostname }
        }
    }

    getCommand(application: Application): string {
        const { name: appName, input: appInput } = application;
        const { protocol, hostname } = this.apiUrl;

        return `import grpc \n
from hydrosdk import Cluster, Application \n

credentials = grpc.ssl_channel_credentials() \n
cluster = Cluster( \n
    http_address="${protocol}//${hostname}", \n
    grpc_address="${hostname}", \n
    ssl=True,\t\t\t\t# turn off, if your Hydrosphere instance doesn't have \n
    grpc_credentials=credentials\t# a TLS certificate installed \n
) \n

application = Application.find(cluster, "${appName}") \n
application.lock_while_starting() \n
predictor = application.predictor() \n

result = predictor.predict(${appInput}) \n
`.trim();
    }
}
