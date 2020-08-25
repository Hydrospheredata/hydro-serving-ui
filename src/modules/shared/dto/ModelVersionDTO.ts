import { ModelDTO } from '@shared/dto/ModelDTO';
import { ModelContract } from '@shared/interfaces';
import { ModelVersionStatus, ModelVersionMetadata } from '@shared/models';

export interface ModelVersionDTO {
  id: number;
  created: string;
  finished: string;
  modelVersion: number;
  modelContract: ModelContract;
  model: ModelDTO;
  status: ModelVersionStatus;
  metadata: ModelVersionMetadata;
  applications: string[];
  image: { sha256: string; name: string; tag: string };
  runtime: { sha256: string; name: string; tag: string };
  hostSelector: {
    name: string;
    id: number;
    nodeSelector: {
      additionalProp1: string;
      additionalProp3: string;
      additionalProp2: string;
    };
  };
  isExternal: boolean;
}
