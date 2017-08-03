import { Injectable } from '@angular/core';
import { RuntimeTypeBuilder } from '@builders/runtime-type.builder';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';

@Injectable()
export class ModelBuilder {

  constructor(
    private runtimeTypeBuilder: RuntimeTypeBuilder,
    private modelRuntimeBuilder: ModelRuntimeBuilder
  ) { }

  public build(props): Model {
    return this.toModel(props);
  }

  private toModel(props) {
    let runtimeType: RuntimeType;
    let model: Model;
    let lastModelRuntime: ModelRuntime;

    if(props['runtimeType']) {
      runtimeType = this.runtimeTypeBuilder.build(props['runtimeType']);
    }

    if(props['lastModelRuntime']) {
      lastModelRuntime = this.modelRuntimeBuilder.build(props['lastModelRuntime']);
    }

    model = new Model({
      id: props['id'],
      name: props['name'],
      source: props['source'],
      description: props['description'],
      outputFields: props['outputFields'],
      inputFields: props['inputFields'],
      created: props['created'],
      updated: props['updated'],
      runtimeType: runtimeType,
      lastModelRuntime: lastModelRuntime
    });

    return model;
  }
}
