import { IMonitoringAggregationItem } from '@shared/models/monitoring-aggregation.model';

export enum ITimelineLogItemStatus {
    'success' = '#76da8c',
    'failed' = '#e45757',
    'unknown' = 'grey',
}

export interface ITimelineLogItem {
    from: number;
    to: number;
    status: string;
}

export interface ITimelineLog {
    [key: string]: IMonitoringAggregationItem[];
}
