import { RuntimeType } from '@models/runtime-type';
import { ModelBuild } from '@models/model-build';

export class Model {
  public id: string;
  public name: string;
  public source: string;
  public description: string;
  public outputFields: string[]
  public inputFields: string[];
  public created: string;
  public updated: string;
  public runtimeType: RuntimeType;
  public lastModelBuild: ModelBuild;

  constructor(props: any) {
    this.id = props['id'];
    this.name = props['name'];
    this.source = props['source'];
    this.description = props['description'];
    this.outputFields = props['outputFields'];
    this.inputFields = props['inputFields'];
    this.created = props['created'];
    this.updated = props['updated'];
    this.runtimeType = props['runtimeType'];
  }
}
