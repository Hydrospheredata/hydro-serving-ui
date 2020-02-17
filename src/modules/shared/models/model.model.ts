export class Model {
  id: number;
  name: string;
  modelVersions: string[];
  favorite: boolean = false;

  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
    this.modelVersions = [];
    this.favorite = false;
  }
}
