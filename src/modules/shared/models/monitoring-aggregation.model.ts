export interface MonitoringAggregationItem {
    meanValue: number | null;
    meanHealth: number | null;
    from: number;
    till: number;
    modelVersionId: number;
    minValue: null;
    maxValue: null;
}

export interface MonitoringAggregation {
    [metricSpecificationId: string]: MonitoringAggregationItem[];
}
