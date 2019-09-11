export class Model {
  id: number;
  name: string;
  modelVersions: string[];

  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
    this.modelVersions = [];
  }
}
