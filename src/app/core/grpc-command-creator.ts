import { Application } from '@app/core/data/types';
import { CommandCreator } from './command-creator';

export class GrpcCommandCreator extends CommandCreator {
  constructor(private url: string) {
    super();
  }

  getCommand(application: Application, input: string): string {
    const { name: appName } = application;
    console.log(this.url);
    const { origin, host } = new URL(this.url);

    return `import grpc \n
from hydrosdk import Cluster, Application \n
credentials = grpc.ssl_channel_credentials() \n
cluster = Cluster( \n
    http_address="${origin}", \n
    grpc_address="${host}", \n
    ssl=True,\t\t\t\t# turn off, if your Hydrosphere instance doesn't have \n
    grpc_credentials=credentials\t# a TLS certificate installed \n
) \n
application = Application.find(cluster, "${appName}") \n
application.lock_while_starting() \n
predictor = application.predictor() \n
result = predictor.predict(${input}) \n
`.trim();
  }
}
