import { Injectable } from '@angular/core';
import { CurrentServices } from '@models/current-services';

@Injectable()
export class ModelCurrentServicesBuilder {

  constructor() { }

  public build(props): CurrentServices {
    return this.toCurrentServices(props);
  }

  private toCurrentServices(props) {
    let currentServices: CurrentServices;
    currentServices = new CurrentServices(props);

    return currentServices;
  }
}
