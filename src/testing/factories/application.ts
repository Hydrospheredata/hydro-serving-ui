import { ApplicationsBuilderService } from '@applications/services';
import { Application } from '@shared/_index';

const applicationBuilder = new ApplicationsBuilderService();
export const application: Application = applicationBuilder.build({});
