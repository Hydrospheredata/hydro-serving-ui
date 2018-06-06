import { MetricSpecification } from './metric-specification.model';


export class MetricSettings {
  public id: string;
  public name: string;
  public filter: Map<string, string>;
  public metricProviderSpecification: MetricSpecification;

  constructor(props: Object = {}) {
    this.id = props["id"]
    this.filter = props["filter"]
    this.name = props["name"]
    this.metricProviderSpecification = props["metricProviderSpecification"]
  }
}
