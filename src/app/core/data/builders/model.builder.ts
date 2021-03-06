import { Injectable } from '@angular/core';
import { Model } from '../types/model';

@Injectable({
  providedIn: 'root',
})
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
