import { Injectable } from '@angular/core';
import { CurlCommandCreator } from '@core/services/command-creator/curl-command-creator';
import { GrpcCommandCreator } from '@core/services/command-creator/grpc-command-creator';
import { CommandCreator } from './command-creator';

export class UnknownCommandCreator extends CommandCreator {
    getCommand() {
        return '';
    }
}

@Injectable()
export class CommandCreatorFactory {
    create(type): CommandCreator {
        switch (type) {
            case 'grpc':
                return new GrpcCommandCreator();
            case 'curl':
                return new CurlCommandCreator();
            default:
                return new UnknownCommandCreator();
        }
    }
}
