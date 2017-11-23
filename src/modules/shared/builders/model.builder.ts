import { Injectable } from '@angular/core';
import { RuntimeTypeBuilder } from './runtime-type.builder';
import { ModelRuntimeBuilder } from './model-runtime.builder';
import { Model, RuntimeType, ModelRuntime, ModelBuild, CurrentServices } from '@shared/models/_index';
import { ModelBuildBuilder } from './model-build.builder';
import { ModelCurrentServicesBuilder } from './model-current-services.builder';


@Injectable()
export class ModelBuilder {

  constructor(
    private runtimeTypeBuilder: RuntimeTypeBuilder,
    private modelRuntimeBuilder: ModelRuntimeBuilder,
    private modelBuildBuilder: ModelBuildBuilder,
    private modelCurrentServicesBuilder: ModelCurrentServicesBuilder
  ) { }

  public build(props): Model {
    return this.toModel(props);
  }

  private toModel(props) {
    let runtimeType: RuntimeType;
    let model: Model;
    let lastModelRuntime: ModelRuntime;
    let lastModelBuild: ModelBuild;
    let currentServices: CurrentServices[] = [];

    if (props.model && props.model['runtimeType']) {
      runtimeType = this.runtimeTypeBuilder.build(props.model['runtimeType']);
    }

    if (props['lastModelRuntime']) {
      lastModelRuntime = this.modelRuntimeBuilder.build(props['lastModelRuntime']);
    }

    if (props['lastModelBuild']) {
      lastModelBuild = this.modelBuildBuilder.build(props['lastModelBuild']);
    }

    if (props['currentServices'] && props['currentServices'].length) {
      currentServices = this.modelCurrentServicesBuilder.build(props['currentServices']);
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
      nextVersion: props['nextVersion'],
      nextVersionAvailable: props['nextVersionAvailable'],
      runtimeType: runtimeType,
      lastModelRuntime: lastModelRuntime,
      lastModelBuild: lastModelBuild,
      currentServices: currentServices
    });
    return model;
  }
}
