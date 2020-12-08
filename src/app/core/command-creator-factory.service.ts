import { Injectable, Inject } from '@angular/core';
import { CurlCommandCreator } from './curl-command-creator';
import { GrpcCommandCreator } from './grpc-command-creator';
import { CommandCreator } from './command-creator';
import { HS_ABSOLUTE_URL } from '@app/core/base-url.token';

export class UnknownCommandCreator extends CommandCreator {
  getCommand = () => '';
}

@Injectable()
export class CommandCreatorFactory {
  constructor(@Inject(HS_ABSOLUTE_URL) private url: string) {}

  create(type): CommandCreator {
    switch (type) {
      case 'grpc':
        return new GrpcCommandCreator(this.url);
      case 'curl':
        return new CurlCommandCreator(this.url);
      default:
        return new UnknownCommandCreator();
    }
  }
}
