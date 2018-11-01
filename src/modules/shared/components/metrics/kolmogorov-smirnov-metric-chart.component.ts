import { 
    Component, 
    ChangeDetectionStrategy
} from '@angular/core';

import { MetricsService } from '@core/services/metrics/metrics.service';
import { InfluxDBService } from '@core/services';
import { BaseMetricChartComponent } from '@shared/components/metrics/base-metric-chart.component';

@Component({
    selector: 'hydro-kolmogorov-smirnov-metric-chart',
    templateUrl: './kolmogorov-smirnov-metric-chart.component.html',
    styleUrls: [
        './base-metric-chart.component.scss', 
        './kolmogorov-smirnov-metric-chart.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KolmogorovSmirnovChartComponent extends BaseMetricChartComponent {
    public selectedFeature: string = '0';

    constructor(
        public metricsService: MetricsService,
        public influxdbService: InfluxDBService
    ) { 
        super(metricsService, influxdbService);
    }

    get featureList(): string[]{
        let features:string[] = [];
        for(let i = 0; i < 112;i++){
            features.push(`${i}`);
        };
        return features;
    }

    protected filterFunction(_): boolean {
        return _["columnIndex"] == this.selectedFeature
    }

    protected getRequestPromise(): Promise<any> {
        return this.metricsService.getMetrics(this.applicationId, this.stageId, this.chartTimeWidth, this.metrics, this.selectedFeature)
    }
}
