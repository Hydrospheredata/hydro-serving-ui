import { mockAggregationWithId } from '@monitoring/mocks/aggregation.mock';
import { AggregationsList } from '@monitoring/models';

export const emptyAggregationList = new AggregationsList([], 0);
export const aggregationList = new AggregationsList(
  [mockAggregationWithId('1'), mockAggregationWithId('2')],
  2
);
