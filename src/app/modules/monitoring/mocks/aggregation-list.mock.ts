import { mockAggregationWithId } from './aggregation.mock';
import { AggregationsList } from '../models';

export const emptyAggregationList = new AggregationsList([], 0, 0, 0);
export const aggregationList = new AggregationsList(
  [mockAggregationWithId('1'), mockAggregationWithId('2')],
  2,
  0,
  0
);
