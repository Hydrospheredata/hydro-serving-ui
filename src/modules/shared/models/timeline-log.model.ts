import { MonitoringAggregationItem } from '@shared/models/monitoring-aggregation.model';

export enum TimelineLogItemStatus {
  'success' = '#76da8c',
  'failed' = '#e45757',
  'unknown' = 'grey',
}

export interface TimelineLogItem {
  from: number;
  to: number;
  status: string;
}

export interface TimelineLog {
  [metricName: string]: MonitoringAggregationItem[];
}
