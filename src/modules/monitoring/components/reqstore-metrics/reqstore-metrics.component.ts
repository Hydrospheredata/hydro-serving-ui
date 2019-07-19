import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IMetricData } from '@core/services/metrics/monitoring.service';

@Component({
  selector: 'hs-reqstore-metrics',
  templateUrl: 'reqstore-metrics.component.html',
  styleUrls: ['reqstore-metrics.component.scss'],
})
export class ReqstoreMetricsComponent {
  @Input() metrics: any[];

  metricHasManyFeatures(metric) {
    const features = Object.values(metric);
    return features.length > 1;
  }

  featuresCount(metric) {
    const features = Object.values(metric);
    return features.length;
  }

  failedCount(metric) {
    const features = Object.values(metric).filter(metrics => {
      const firstMetric = Object.values(metrics)[0];
      return firstMetric.health === false;
    });
    return features.length;
  }

  isFailedFeature(feature: { [columnIndex: string]: IMetricData }) {
    const metrics: IMetricData[] = Object.values(feature);
    return metrics.some(metricData => metricData.health === false);
  }

  valueAscOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return a.key - b.key;
  }
}
