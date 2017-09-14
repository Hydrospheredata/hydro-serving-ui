export class CurrentServices {
  public serviceId: number;
  public serviceName: string;
  public cloudDriverId: string;
  public modelRuntime: object[];

  constructor(props: object = {}) {
    this.serviceId = props['serviceId'] || '';
    this.serviceName = props['serviceName'] || '';
    this.cloudDriverId = props['cloudDriverId'] || '';
    this.modelRuntime = props['modelRuntime'] || [{}];
  }
}
