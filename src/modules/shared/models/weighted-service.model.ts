export class WeightedService {
  public id: number;
  public serviceName: string;
  public weights: any;

  constructor(props: object = {}) {
    this.id = props['id'];
    this.serviceName = props['serviceName'];
    this.weights = props['weights'];
  }
}
