export enum ITimelineLogItemStatus {
    'success' = '#76da8c',
    'failed' = '#e45757',
    'unknown' = 'grey',
}

export interface ITimelineLogItem {
    from: number;
    to: number;
    status: 'success' | 'failed';
}

export interface ITimelineLog {
    [key: string]: ITimelineLogItem[];
}
