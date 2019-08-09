export interface IModel {
  id: number;
  name: string;
}

export class Model {
  public id: number;
  public name: string;

  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
  }
}
