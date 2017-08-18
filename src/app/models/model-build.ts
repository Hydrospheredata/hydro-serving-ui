import { RuntimeType } from '@models/runtime-type';
import { ModelRuntime } from '@models/model-runtime';
import { Model } from '@models/model';

export class ModelBuild {
  public id: string;
  public model: Model;
  public finished: string;
  public statusText: string;
  public status: string;
  public modelRuntime: ModelRuntime;

  constructor(props: any = {}) {
    this.id = props['id'] || '';
    this.model = props['model'] || new Model();
    this.finished = props['finished'] || '';
    this.statusText = props['statusText'] || '';
    this.status = props['status'] || '';
    this.modelRuntime = props['modelRuntime'] || new ModelRuntime();
  }
}
