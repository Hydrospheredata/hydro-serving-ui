import { ModelBuildBuilder, ModelVersionBuilder } from '@core/builders/_index';

const modelVerBuilder = new ModelVersionBuilder();
const modelBuildBuilder: ModelBuildBuilder = new ModelBuildBuilder(modelVerBuilder);
export const modelBuild = modelBuildBuilder.build({});
