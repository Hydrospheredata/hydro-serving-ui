import { RuntimeType } from './runtime-type.model';
import { ModelRuntime } from './model-runtime.model';
import { ModelBuild } from './model-build.model';
import { CurrentServices } from './current-services.model';

export class Model {
  public id: number;
  public modelId: number;
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
  public nextVersion: string;
  public nextVersionAvailable: boolean;

  constructor(props: any = {}) {
    this.id = props['id'] || '';
    this.name = props['name'] || '';
    this.source = props['source'] || '';
    this.description = props['description'] || '';
    this.modelId = props['modelId'] || '';
    this.outputFields = props['outputFields'] || [''];
    this.inputFields = props['inputFields'] || [''];
    this.created = props['created'] || '';
    this.updated = props['updated'] || '';
    this.runtimeType = props['runtimeType'] || {};
    this.lastModelRuntime = props['lastModelRuntime'] || {};
    this.lastModelBuild = props['lastModelBuild'] || {};
    this.currentServices = props['currentServices'];
    this.nextVersion = props['nextVersion'] || '';
    this.nextVersionAvailable = props['nextVersionAvailable'] || false;
  }
}
