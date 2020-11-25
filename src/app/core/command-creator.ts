import { Application } from '@app/core/data/types';

export abstract class CommandCreator {
  abstract getCommand(application: Application, input: string): string;
}
