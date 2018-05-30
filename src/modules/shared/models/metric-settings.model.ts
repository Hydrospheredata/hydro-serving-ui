import { MetricSpecification } from './metric-specification.model';


export class MetricSettings {
  public id: String;
  public filter: Map<String, String>;
  public metricSpecification: MetricSpecification;

  constructor(props: Object = {}) {
    this.id = props["id"]
    this.filter = props["filter"]
    this.metricSpecification = props["metricSpecification"]
  }
}
