import { isEmptyObj } from '@shared/utils/is-empty-object';
import { union } from 'lodash';
import { compose } from 'lodash/fp';

interface Check {
  checks: number;
  passed: number;
}

export class AggregationsList {
  aggregations: Aggregation[] = [];
  constructor(aggregations: Aggregation[]) {
    this.aggregations = aggregations;
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
  metricsChecks: { [metricName: string]: { checked: number; passed: number } };
  batchesChecks: {
    [featureName: string]: {
      [metricName: string]: { checked: number; passed: number };
    };
  };
  featuresChecks: { [featureName: string]: Check };
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
  ): { [featureName: string]: Check } {
    const featuresChecks = Object.create(null);

    for (const featureNameKey in params) {
      if (params.hasOwnProperty(featureNameKey)) {
        if (!featureNameKey.startsWith('_')) {
          featuresChecks[featureNameKey] = params[featureNameKey];
        }
      }
    }

    return featuresChecks;
  }
}

export const MockAggregation: Aggregation = {
  batchesChecks: {},
  featuresChecks: {},
  from: undefined,
  hs_requests: 0,
  id: '',
  metricsChecks: {},
  modelVersionId: 0,
  to: undefined,
};
