export class MetricSpecification {
  public metricProviderClass: String;
  public hystoryProviderClass?: String;
  public config?: Object;

  constructor(props: Object = {}) {
    this.metricProviderClass = props["metricProviderClass"]
    if (props["historyProviderClass"]) { this.hystoryProviderClass = props["historyProviderClass"] }
    if (props["config"]) { this.config = props["config"] }
  }
}
