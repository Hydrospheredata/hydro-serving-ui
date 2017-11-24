import { RuntimeType } from '@shared/models/_index';
export class ModelRuntime {
  public id: string;
  public modelVersion: string;
  public modelName: string;
  public imageName: string;
  public imageTag: string;
  public imageMD5Tag: string;
  public runtimeType: RuntimeType;
  public outputFields: string[];
  public inputFields: string[];
  public created: string;
  public modelId: string;

  constructor(props: any = {}) {
      this.id = props['id'];
      this.modelVersion = props['modelVersion'] || '';
      this.modelName = props['modelName'] || '';
      this.imageName = props['imageName'] || '';
      this.imageTag = props['imageTag'] || '';
      this.imageMD5Tag = props['imageMD5Tag'] || '';
      this.runtimeType = props['runtimeType'] || {};
      this.outputFields = props['outputFields'] || '';
      this.inputFields = props['inputFields'] || '';
      this.created = props['created'] || '';
      this.modelId = props['modelId'] || '';
  }
}
