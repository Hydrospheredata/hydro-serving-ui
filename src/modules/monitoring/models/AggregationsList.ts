import { Aggregation } from '@monitoring/models/Aggregation';
import { isEmptyObj } from '@shared/utils';
import { union } from 'lodash';
import { compose } from 'lodash/fp';

export class AggregationsList {
  aggregations: Aggregation[] = [];
  readonly batchesCount: number;

  constructor(aggregations: Aggregation[], batchesCount: number) {
    this.aggregations = aggregations;
    this.batchesCount = batchesCount || 0;
  }

  get featureNames(): string[] {
    const firstAggregation = this.aggregations[0];

    return firstAggregation ? Object.keys(firstAggregation.featuresChecks) : [];
  }

  get inputNames(): string[] {
    const firstAggregation = this.aggregations[0];

    return firstAggregation ? firstAggregation.inputFeaturesNames : [];
  }

  get outputNames(): string[] {
    const firstAggregation = this.aggregations[0];

    return firstAggregation ? firstAggregation.outputFeaturesNames : [];
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
