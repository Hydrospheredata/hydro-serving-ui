import { Injectable } from '@angular/core';
import {
  ChecksAggregationResponse,
  ChecksAggregation,
} from '@monitoring/interfaces';

@Injectable({ providedIn: 'root' })
export class CheckAggregationBuilder {
  get infoKeys(): string[] {
    return [
      '_id',
      '_hs_first_id',
      '_hs_last_id',
      '_hs_model_version_id',
      '_hs_requests',
    ];
  }

  build(rawCheck: ChecksAggregationResponse): ChecksAggregation {
    const systemKeys = this.infoKeys;
    const res: ChecksAggregation = { additionalInfo: {}, features: {} };
    for (const prop in rawCheck) {
      if (rawCheck.hasOwnProperty(prop)) {
        if (systemKeys.includes(prop)) {
          res.additionalInfo[prop] = rawCheck[prop];
        } else {
          res.features[prop] = rawCheck[prop];
        }
      }
    }
    return res;
  }
}
