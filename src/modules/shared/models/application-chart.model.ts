import { GroupedRows, ChartRow } from '@shared/models/_index';

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

export interface IChartData {
    metricProvider: IMetricProvider;
    metricsData?: GroupedRows<ChartRow>;
    threshold?: number | null;
}
