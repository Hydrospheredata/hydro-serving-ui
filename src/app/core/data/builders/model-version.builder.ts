import { Injectable } from '@angular/core';
import {
  ModelVersion,
  ModelVersionStatus,
  ModelVersionDTO,
} from '../types/model-version';
import { ModelSignature } from '@app/core/data/types';

@Injectable({
  providedIn: 'root',
})
export class ModelVersionBuilder {
  public build(props: any): ModelVersion {
    return this.toModelVersion(props);
  }

  private toModelVersion(props: ModelVersionDTO): ModelVersion {
    return new ModelVersion({
      id: props.id,
      image: props.image,
      created: props.created,
      finished: props.finished,
      modelVersion: props.modelVersion,
      modelSignature: new ModelSignature(props.modelSignature),
      runtime: props.runtime,
      model: props.model,
      hostSelector: props.hostSelector,
      status:
        (props.status && ModelVersionStatus[props.status]) ||
        ModelVersionStatus.Undefined,
      applications: props.applications || [],
      metadata: props.metadata || {},
      isExternal: props.isExternal,
    });
  }
}
