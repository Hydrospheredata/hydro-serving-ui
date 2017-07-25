import { Injectable } from '@angular/core';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';

@Injectable()
export class ModelBuilder {

  constructor() { }

  public build(props): Model {
    return this.toModel(props);
  }

  private toModel(props) {
    let runtimeType: RuntimeType;
    let model: Model;

    if(props['runtimeType']) {
      runtimeType = new RuntimeType({
        id: props['runtimeType']['id'],
        name: props['runtimeType']['name'],
        version: props['runtimeType']['version']
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
      runtimeType: runtimeType
    });

    return model;
  }

}
