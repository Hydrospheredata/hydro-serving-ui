import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';

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
  public lastModelRuntime: ModelRuntime;

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
