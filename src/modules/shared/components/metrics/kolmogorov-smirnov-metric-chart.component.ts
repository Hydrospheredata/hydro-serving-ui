import {
    Component,
    ChangeDetectionStrategy,
    Injectable
} from '@angular/core';

import { InfluxDBService } from '@core/services';
import { MetricsService } from '@core/services/metrics/metrics.service';
import { BaseMetricChartComponent } from '@shared/components/metrics/base-metric-chart.component';

import { HttpClient } from '@angular/common/http';
import { ReqstoreService } from '@core/services/reqstore.service';

interface IMetricData {
    name: string;
    value: number;
    labels: {modelVersionId: string};
    timestamp: number;
    health: any;
}
@Component({
    selector: 'hs-kolmogorov-smirnov-metric-chart',
    templateUrl: './kolmogorov-smirnov-metric-chart.component.html',
    styleUrls: [
        './base-metric-chart.component.scss',
        './kolmogorov-smirnov-metric-chart.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KolmogorovSmirnovChartComponent extends BaseMetricChartComponent {
    public selectedFeature: string = '0';

    constructor(
        public metricsService: MetricsService,
        public influxdbService: InfluxDBService,
        public reqstore: ReqstoreService
    ) {
        super(metricsService, influxdbService, reqstore);
    }

    get featureList(): string[] {
        const features: string[] = [];

        for (let i = 0; i < 112; i++) {
            features.push(`${i}`);
        }

        return features;
    }

    protected getRequestPromise(id, i, metrics): Promise<IMetricData[]> {
        return this.metricsService.getMetrics(
            id.toString(),
            i,
            metrics,
            this.selectedFeature
        );
    }
}
