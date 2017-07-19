export class RuntimeType {
  public name: string;
  public version: string;

  constructor(runtimeTypeInfo: any) {
    this.name = runtimeTypeInfo['name'];
    this.version = runtimeTypeInfo['version'];
  }
}
