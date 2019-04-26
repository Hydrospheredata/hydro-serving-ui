export interface IMonitoringAggregationItem {
    meanValue: number | null;
    meanHealth: number | null;
    from: number;
    till: number;
    modelVersionId: number;
    minValue: null;
    maxValue: null;
}

export type IMonitoringAggregationList = IMonitoringAggregationItem[];

export interface IMonitoringAggregationVM {
    [metricSpecificationName: string]: IMonitoringAggregationList;
}
