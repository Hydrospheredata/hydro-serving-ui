import { Injectable, Inject } from '@angular/core';
import { CurlCommandCreator } from './curl-command-creator';
import { GrpcCommandCreator } from './grpc-command-creator';
import { CommandCreator } from './command-creator';
import { HS_BASE_URL } from '@app/core/base-url.token';

export class UnknownCommandCreator extends CommandCreator {
  getCommand = () => '';
}

@Injectable()
export class CommandCreatorFactory {
  constructor(@Inject(HS_BASE_URL) private httpUrl: string) {}

  create(type): CommandCreator {
    switch (type) {
      case 'grpc':
        return new GrpcCommandCreator(this.httpUrl);
      case 'curl':
        return new CurlCommandCreator(this.httpUrl);
      default:
        return new UnknownCommandCreator();
    }
  }
}
