import { MetricSpecification } from './metric-specification.model';


export class MetricSettings {
  public id: String;
  public name: String;
  public filter: Map<String, String>;
  public metricProviderSpecification: MetricSpecification;

  constructor(props: Object = {}) {
    this.id = props["id"]
    this.filter = props["filter"]
    this.name = props["name"]
    this.metricProviderSpecification = props["metricProviderSpecification"]
  }
}
