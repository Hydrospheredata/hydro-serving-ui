import { Injectable } from '@angular/core';
import { ModelBuild } from '@models/model-build';

@Injectable()
export class ModelBuildBuilder {

  constructor() { }

  public build(props): ModelBuild {
    return this.toModel(props);
  }

  private toModel(props) {
    let lastModelBuild: ModelBuild;
    if (props) {
      lastModelBuild = new ModelBuild({
        id: props.id,
        model: props.model,
        finished: props.finished,
        statusText: props.statusText,
        status: props.status,
        modelRuntime: props.modelRuntime
      });

      return lastModelBuild;
    }
  }

}
