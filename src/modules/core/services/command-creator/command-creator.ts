import { Application } from '@shared/_index';

export abstract class CommandCreator {
    abstract getCommand(application: Application): string;
}
