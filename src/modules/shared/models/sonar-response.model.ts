export interface SonarMetricData {
    name: string;
    value: number;
    labels: {
        columnIndex: string;
        modelVersionId: string;
        trace?: any;
        traces?: any;
    };
    timestamp: number;
    health: any;
}

export type SonarResponse = SonarMetricData[];
