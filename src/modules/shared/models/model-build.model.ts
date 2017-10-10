import { RuntimeType } from './runtime-type.model';
import { ModelRuntime } from './model-runtime.model';
import { Model } from './model.model';

export class ModelBuild {
  public id: number;
  public model: Model;
  public finished: Date;
  public started: Date;
  public statusText: string;
  public status: string;
  public modelRuntime: ModelRuntime;
  public modelVersion: string;

  constructor(props: any = {}) {
    this.id = props['id'] || 0;
    this.model = props['model'] || new Model();
    this.finished = props['finished'] || '';
    this.started = props['started'] || '';
    this.statusText = props['statusText'] || '';
    this.status = props['status'] || '';
    this.modelRuntime = props['modelRuntime'] || new ModelRuntime();
    this.modelVersion = props['modelVersion'] || '';
  }
}
