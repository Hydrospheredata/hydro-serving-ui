import { Injectable } from '@angular/core';
import { Service } from '@shared/models/_index';


@Injectable()
export class ServiceBuilder {

  constructor() { }

  public build(service) {
    return new Service(service);
  }

}
