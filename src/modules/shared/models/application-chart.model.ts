export interface IMetricProvider {
    config: {};
    id: string;
    isSystem: boolean;
    metrics: string[];
    metricProviderClass: string;
    name: string;
    timestamp: number;
    healthConfig: {};
    historyProviderClass: any;
    withHealth: boolean;
}

export interface IMetricDataRow {
    time: Date;
    value: number;
    health: number | null;
    modelVersionId: string;
    columnIndex: string | null;
}

export interface IMetricData {
    name: string;
    rows: IMetricDataRow[]
}

export interface IChartData {
    metricProvider: IMetricProvider;
    metricsData?: IMetricData[];
    threshold?: number | null;
}