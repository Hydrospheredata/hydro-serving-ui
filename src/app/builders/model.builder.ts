import { Injectable } from '@angular/core';
import { RuntimeTypeBuilder } from '@builders/runtime-type.builder';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';
import { ModelBuildBuilder } from '@builders/model-build.builder';
import { ModelBuild } from '@models/model-build';


@Injectable()
export class ModelBuilder {

  constructor(
    private runtimeTypeBuilder: RuntimeTypeBuilder,
    private modelRuntimeBuilder: ModelRuntimeBuilder,
    private modelBuildBuilder: ModelBuildBuilder
  ) { }

  public build(props): Model {
    return this.toModel(props);
  }

  private toModel(props) {
    let runtimeType: RuntimeType;
    let model: Model;
    let lastModelRuntime: ModelRuntime;
    let lastModelBuild: ModelBuild;

    runtimeType = this.runtimeTypeBuilder.build(props.model['runtimeType']) || new RuntimeType();

    if (props['lastModelRuntime']) {
      lastModelRuntime = this.modelRuntimeBuilder.build(props['lastModelRuntime']) || new ModelRuntime({});
    }

    if (props['lastModelBuild']) {
      lastModelBuild = this.modelBuildBuilder.build(props['lastModelBuild']);
    }

    model = new Model({
      id: props.model['id'],
      name: props.model['name'],
      source: props.model['source'],
      description: props.model['description'],
      outputFields: props.model['outputFields'],
      inputFields: props.model['inputFields'],
      created: props.model['created'],
      updated: props.model['updated'],
      runtimeType: runtimeType,
      lastModelRuntime: lastModelRuntime,
      lastModelBuild: lastModelBuild
    });

    return model;
  }
}
