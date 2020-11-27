import { Aggregation } from './Aggregation';
import { union, isEmpty } from 'lodash';
import { compose } from 'lodash/fp';

export class AggregationsList {
  aggregations: Aggregation[] = [];
  readonly totalBatchesCount: number;
  readonly showedBatchesCount: number;
  readonly minDate: Date;
  readonly maxDate: Date;
  constructor(
    aggregations: Aggregation[] = [],
    batchesCount: number = 0,
    minDate: number,
    maxDate: number
  ) {
    this.aggregations = aggregations;
    this.totalBatchesCount = batchesCount;
    this.showedBatchesCount = aggregations.length;
    this.minDate = new Date(minDate * 1000);
    this.maxDate = new Date(maxDate * 1000);
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
      .filter(agg => !isEmpty(agg.batchesChecks))
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
