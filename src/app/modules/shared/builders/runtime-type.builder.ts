import { Injectable } from '@angular/core';
import { RuntimeType } from '@shared/models/_index';

@Injectable()
export class RuntimeTypeBuilder {

constructor() { }

  public build(props): RuntimeType {
    return this.toRuntimeType(props);
  }

  private toRuntimeType(props) {
    let runtimeType: RuntimeType;
    runtimeType = new RuntimeType(props);

    return runtimeType;
  }
}
