import {
  Application,
  ApplicationUpdateRequest,
  ModelVariant,
} from '../types/application';

export function applicationToUpdateRequest(
  a: Application,
): ApplicationUpdateRequest {
  const stages = a.executionGraph.stages;
  const prepareModelVariant = (m: ModelVariant) => {
    return {
      modelVersionId: m.modelVersionId,
      weight: m.weight,
      deploymentConfigName: m.deploymentConfigurationName,
    };
  };

  const newStages = stages.map(s => {
    return {
      modelVariants: s.modelVariants.map(prepareModelVariant),
    };
  });

  return { ...a, executionGraph: { stages: newStages } };
}
