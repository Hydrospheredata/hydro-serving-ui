import { Application } from "@shared/_index";
export interface CommandCreator {
    getCommand(application: Application): string;
}
