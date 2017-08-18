import { Injectable } from '@angular/core';
import { RuntimeTypeBuilder } from '@builders/runtime-type.builder';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';
import { ModelBuildBuilder } from '@builders/model-build.builder';
import { ModelBuild } from '@models/model-build';
import { CurrentServices } from '@models/current-services';
import { ModelCurrentServicesBuilder } from '@builders/model-current-services.builder';


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

    runtimeType = this.runtimeTypeBuilder.build(props.model['runtimeType']);

    if (props['lastModelRuntime']) {
      lastModelRuntime = this.modelRuntimeBuilder.build(props['lastModelRuntime']);
    }

    if (props['lastModelBuild']) {
      lastModelBuild = this.modelBuildBuilder.build(props['lastModelBuild']);
    }

    if (props['currentServices'].length) {
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
      runtimeType: runtimeType,
      lastModelRuntime: lastModelRuntime,
      lastModelBuild: lastModelBuild,
      currentServices: currentServices
    });

    return model;
  }
}
