import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

import { InfluxDBService } from '@core/services';
import { MonitoringService, IMetricData } from '@core/services/metrics/monitoring.service';
import { BaseMetricChartComponent } from '@shared/components/metrics/base-metric-chart.component';

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
    selectedFeature: string = '0';
    @Output() selectFeature = new EventEmitter();

    set sF(value: string) {
        this.selectedFeature = value;
        this.selectFeature.next(value);
    }

    get sF() {
        return this.selectedFeature;
    }

    constructor(
        public metricsService: MonitoringService,
        public influxdbService: InfluxDBService
    ) {
        super(metricsService, influxdbService);
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
            this.sF
        );
    }
}
