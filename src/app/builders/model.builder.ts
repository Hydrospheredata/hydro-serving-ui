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
      runtimeType = this.extractRuntimeType(props['runtimeType'])
    }

    if(props['lastModelRuntime']) {
      lastModelRuntime = new ModelRuntime({
        id: props['lastModelRuntime']['id'],
        modelVersion: props['lastModelRuntime']['modelVersion'],
        modelName: props['lastModelRuntime']['modelName'],
        imageName: props['lastModelRuntime']['imageName'],
        imageTag: props['lastModelRuntime']['imageTag'],
        imageMD5Tag: props['lastModelRuntime']['imageMD5Tag'],
        runtimeType: props['lastModelRuntime']['runtimeType'],
        outputFields: props['lastModelRuntime']['outputFields'],
        inputFields: props['lastModelRuntime']['inputFields'],
        created: props['lastModelRuntime']['created'],
        modelId: props['lastModelRuntime']['modelId']
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

  private extractRuntimeType(props) {
    let runtimeType = new RuntimeType({
      id: props['id'],
      name: props['name'],
      version: props['version']
    });

    return runtimeType
  }

  private extractModelRuntime(props) {
    let runtimeType: RuntimeType;
    if (props['lastModelRuntime']['runtimeType']) {
      runtimeType = this.extractRuntimeType(props['lastModelRuntime']['runtimeType']);
    }

    let lastModelRuntime = new ModelRuntime({
      id: props['lastModelRuntime']['id'],
      modelVersion: props['lastModelRuntime']['modelVersion'],
      modelName: props['lastModelRuntime']['modelName'],
      imageName: props['lastModelRuntime']['imageName'],
      imageTag: props['lastModelRuntime']['imageTag'],
      imageMD5Tag: props['lastModelRuntime']['imageMD5Tag'],
      runtimeType: runtimeType,
      outputFields: props['lastModelRuntime']['outputFields'],
      inputFields: props['lastModelRuntime']['inputFields'],
      created: props['lastModelRuntime']['created'],
      modelId: props['lastModelRuntime']['modelId']
    });

    return lastModelRuntime;
  }

}
