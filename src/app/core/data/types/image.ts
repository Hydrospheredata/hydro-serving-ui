export class Image {
  public name: string;
  public tag: string;
  public sha256: string;

  constructor(props) {
    this.name = props.name;
    this.tag = props.tag;
    this.sha256 = props.sha256;
  }
}
