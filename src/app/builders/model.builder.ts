import { Injectable } from '@angular/core';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';

@Injectable()
export class ModelBuilder {

  constructor() { }

  public build(props): Model {
    return this.toModel(props);
  }

  private toModel(props) {
    let runtimeType: RuntimeType;
    let model: Model;
    let lastModelRuntime: ModelRuntime;

    if(props['runtimeType']) {
      runtimeType = new RuntimeType({
        id: props['runtimeType']['id'],
        name: props['runtimeType']['name'],
        version: props['runtimeType']['version']
      });
    }

    if(props['lastModelRuntime']) {
      lastModelRuntime = new ModelRuntime({
        id: props['id'],
        modelVersion: props['modelVersion'],
        started: props['started'],
        finished: props['finished'],
        status: props['status'],
        statusText: props['statusText'],
        logsUrl: props['logsUrl']
      });
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
