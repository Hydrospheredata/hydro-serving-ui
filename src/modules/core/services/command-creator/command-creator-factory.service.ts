import { Injectable } from "@angular/core";
import { CommandCreator } from './command-creator';
import { GrpcCommandCreator } from "@core/services/command-creator/grpc-command-creator";
import { CurlCommandCreator } from "@core/services/command-creator/curl-command-creator";

export class UnknownCommandCreator implements CommandCreator {
    getCommand(){
        return ''
    }
}

@Injectable()
export class CommandCreatorFactory {
    create(type): CommandCreator {
        switch(type){
            case 'grpc':
                return new GrpcCommandCreator;
            case 'curl':
                return new CurlCommandCreator;
            default:
                return new UnknownCommandCreator;
        }
    }
}