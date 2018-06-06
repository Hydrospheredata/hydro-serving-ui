export class MetricSpecification {
  public metricProviderClass: string;
  public hystoryProviderClass?: string;
  public config?: Object;
  public withHealth?: boolean;
  public healthConfig?: Object;

  constructor(props: Object = {}) {
    this.metricProviderClass = props["metricProviderClass"]
    if (props["historyProviderClass"]) { this.hystoryProviderClass = props["historyProviderClass"] }
    if (props["config"]) { this.config = props["config"] }
    if (props["withHealth"] != null) { this.withHealth = props["withHealth"] }
    if (props["healthConfig"]) { this.healthConfig = props["healthConfig"] }
  }
}
