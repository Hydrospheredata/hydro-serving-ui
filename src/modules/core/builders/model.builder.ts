import { Injectable } from '@angular/core';
import { Model } from '@shared/models/_index';

@Injectable()
export class ModelBuilder {
  public build(props): Model {
    return this.toModel(props);
  }

  private toModel(props): Model {
    const model = new Model({
      id: props.id || undefined,
      name: props.name || undefined,
    });

    return model;
  }
}
