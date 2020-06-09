import { isEmptyObj } from '@shared/utils/is-empty-object';
import { union } from 'lodash';
import { compose } from 'lodash/fp';

export interface AggregationCheck {
  checked: number;
  passed: number;
}

export class AggregationsList {
  aggregations: Aggregation[] = [];
  private batchesCount: number;

  constructor(aggregations: Aggregation[], batchesCount: number) {
    this.aggregations = aggregations;
    this.batchesCount = batchesCount || 0;
  }

  get featureNames(): string[] {
    const firstAggregation = this.aggregations[0];
    if (firstAggregation) {
      return Object.keys(firstAggregation.featuresChecks);
    }
    return [];
  }

  get metricNames(): string[] {
    if (this.aggregations.length > 0) {
      const set = new Set();
      this.aggregations.forEach(agg => {
        Object.keys(agg.metricsChecks).forEach(metricName =>
          set.add(metricName)
        );
      });
      return [...set];
    }
    return [];
  }

  get batchNames(): string[] {
    return this.aggregations
      .filter(agg => !isEmptyObj(agg.batchesChecks))
      .reduce((names, { batchesChecks }) => {
        return union(names, Object.keys(Object.values(batchesChecks)[0]));
      }, []);
  }

  get dateFrom(): Date | null {
    if (this.aggregations.length) {
      return this.extractDateFromId(this.aggregations[0].id);
    }
    return null;
  }
  get dateTo(): Date | null {
    if (this.aggregations.length) {
      return this.extractDateFromId(
        this.aggregations[this.aggregations.length - 1].id
      );
    }
    return null;
  }

  get totalRequests(): number {
    if (this.batchesCount === 0) {
      return 0;
    }
    const countInOneBatch = this.aggregations[this.aggregations.length - 1]
      .hs_requests;
    if (this.batchesCount === 1) {
      return countInOneBatch;
    } else {
      return (
        countInOneBatch * (this.batchesCount - 1) +
        this.aggregations[0].hs_requests
      );
    }
  }

  get showedRequests(): number {
    if (this.batchesCount === 0) {
      return 0;
    }
    return this.aggregations.reduce(
      (result, { hs_requests }) => result + hs_requests,
      0
    );
  }

  get lastAggregation(): Aggregation | null {
    if (this.aggregations.length) {
      return this.aggregations[this.aggregations.length - 1];
    } else {
      return null;
    }
  }

  has(aggregation: Aggregation | null): boolean {
    if (
      this.aggregations.length &&
      aggregation !== null &&
      aggregation !== undefined
    ) {
      return this.aggregations.some(({ id }) => id === aggregation.id);
    } else {
      return false;
    }
  }

  private extractDateFromId(id: string): Date {
    const getFirst4Bytes = str => str.slice(0, 8);
    const convertToMicroseconds = str => parseInt(str, 16) * 1000;
    const convertToDate = ms => new Date(ms);

    return compose(convertToDate, convertToMicroseconds, getFirst4Bytes)(id);
  }
}

export class Aggregation {
  from: any;
  to: any;
  id: string;
  hs_requests: number;
  modelVersionId: number;
  metricsChecks: { [metricName: string]: AggregationCheck };
  batchesChecks: {
    [featureName: string]: {
      [metricName: string]: AggregationCheck;
    };
  };
  featuresChecks: { [featureName: string]: AggregationCheck };

  constructor(params: any) {
    this.id = params._id;
    this.hs_requests = params._hs_requests || {};
    this.metricsChecks = params._hs_metrics || {};
    this.batchesChecks = params._hs_batch || {};
    this.featuresChecks = Aggregation.extractFeatureChecks(params);
    this.from = params._hs_first_id;
    this.to = params._hs_last_id;
    this.modelVersionId = params._hs_model_version_id;
  }

  private static extractFeatureChecks(
    params: any
  ): { [featureName: string]: AggregationCheck } {
    const featuresChecks = Object.create(null);

    for (const featureNameKey in params) {
      if (params.hasOwnProperty(featureNameKey)) {
        if (!featureNameKey.startsWith('_')) {
          const check: { checks: number; passed: number } =
            params[featureNameKey];
          featuresChecks[featureNameKey] = {
            checked: check.checks,
            passed: check.passed,
          };
        }
      }
    }

    return featuresChecks;
  }
}
