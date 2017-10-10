import { Model } from './model.model';

export class ModelService {
  public cloudDriverId: string;
  public modelRuntime: Model;
  public serviceId: number;
  public serviceName: string;
  public statusText: string;

  constructor(props: any = {}) {
    this.cloudDriverId = props['cloudDriverId'];
    this.modelRuntime = props['modelRuntime'];
    this.serviceId = props['serviceId'];
    this.serviceName = props['serviceName'];
    this.statusText = props['statusText'];
  }
}
