import { Injectable } from '@angular/core';
import { HS_BASE_URL } from '@core/base-url.token';
import { CurlCommandCreator } from '@core/services/command-creator/curl-command-creator';
import { GrpcCommandCreator } from '@core/services/command-creator/grpc-command-creator';
import { Inject } from '@node_modules/@angular/core';
import { CommandCreator } from './command-creator';

export class UnknownCommandCreator extends CommandCreator {
  getCommand() {
    return '';
  }
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
