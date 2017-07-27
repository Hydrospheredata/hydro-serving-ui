export class RuntimeType {
  public id: string;
  public name: string;
  public version: string;

  constructor(props: any) {
    this.id = props['id'];
    this.name = props['name'];
    this.version = props['version'];
  }
}
