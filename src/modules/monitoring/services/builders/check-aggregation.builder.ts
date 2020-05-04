import { Injectable } from '@angular/core';
import {
  CheckAggregationResponseItem,
  ChecksAggregationItem,
} from '@monitoring/models';
import { MetricSpecification } from '@shared/models/metric-specification.model';

@Injectable({ providedIn: 'root' })
export class CheckAggregationBuilder {
  get systemKeys(): string[] {
    return [
      '_id',
      '_hs_first_id',
      '_hs_last_id',
      '_hs_model_version_id',
      '_hs_requests',
      '_hs_model_name',
      '_hs_metrics',
      '_hs_batch',
      '_hs_metric_checks',
    ];
  }

  build(
    rawCheck: CheckAggregationResponseItem,
    metrics: MetricSpecification[]
  ): ChecksAggregationItem {
    const metricNames = metrics.map(({ name }) => name);
    const obj = {};
    for (const item of metricNames) {
      obj[item] = { checked: undefined, passed: undefined };
    }

    const res: ChecksAggregationItem = {
      additionalInfo: {},
      features: {},
      metrics: { ...obj },
      batch: rawCheck._hs_batch,
    };
    for (const prop in rawCheck) {
      if (rawCheck.hasOwnProperty(prop)) {
        if (this.systemKeys.includes(prop)) {
          res.additionalInfo[prop] = rawCheck[prop];
        } else {
          const { checks: checked, passed } = rawCheck[prop];
          res.features[prop] = { checked, passed };
        }

        res.metrics = { ...obj, ...rawCheck._hs_metrics };
      }
    }
    return res;
  }
}
