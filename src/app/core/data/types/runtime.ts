export class Runtime {
  public name: string;
  public tag: string;
  public sha256: string;

  constructor(props: any = {}) {
    this.name = props.id;
    this.tag = props.name;
    this.sha256 = props.sha256;
  }
}
