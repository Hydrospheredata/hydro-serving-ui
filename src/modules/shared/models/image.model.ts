export interface IImage {
  name: string;
  tag: string;
  sha256: string;
}

export class Image implements IImage {
  public name: string;
  public tag: string;
  public sha256: string;

  constructor(props) {
    this.name = props.name;
    this.tag = props.tag;
    this.sha256 = props.sha256;
  }
}
