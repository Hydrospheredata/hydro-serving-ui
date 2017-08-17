import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';
import { ModelBuild } from './model-build';
import { CurrentServices } from './current-services';

export class Model {
  public id: number;
  public name: string;
  public source: string;
  public description: string;
  public outputFields: string[];
  public inputFields: string[];
  public created: string;
  public updated: string;
  public runtimeType: RuntimeType;
  public lastModelRuntime: ModelRuntime;
  public lastModelBuild: ModelBuild;
  public currentServices: CurrentServices[];

  constructor(props: any = {}) {
    this.id = props['id'] || '';
    this.name = props['name'] || '';
    this.source = props['source'] || '';
    this.description = props['description'] || '';
    this.outputFields = props['outputFields'] || [''];
    this.inputFields = props['inputFields'] || [''];
    this.created = props['created'] || '';
    this.updated = props['updated'] || '';
    this.runtimeType = props['runtimeType'] || {};
    this.lastModelRuntime = props['lastModelRuntime'] || {};
    this.lastModelBuild = props['lastModelBuild'] || {};
    this.currentServices = props['currentServices'];
  }
}
