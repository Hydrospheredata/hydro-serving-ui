import { Injectable } from '@angular/core';
import { ModelVersion, ModelVersionStatus } from '../types/model-version';

@Injectable({
  providedIn: 'root',
})
export class ModelVersionBuilder {
  public build(props): ModelVersion {
    return this.toModelVersion(props);
  }

  private toModelVersion(props): ModelVersion {
    return new ModelVersion({
      id: props.id,
      image: props.image,
      created: props.created,
      finished: props.finished,
      modelVersion: props.modelVersion,
      modelContract: props.modelContract,
      runtime: props.runtime,
      model: props.model,
      hostSelector: props.hostSelector,
      status:
        (props.status && props.status.toLowerCase()) ||
        ModelVersionStatus.Undefined,
      applications: props.applications || [],
      metadata: props.metadata || {},
      isExternal: props.isExternal,
    });
  }
}
