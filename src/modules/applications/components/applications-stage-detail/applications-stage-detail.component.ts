// import * as moment from 'moment';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    ElementRef,
    ViewChild,
} from '@angular/core';
// import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

import { Store } from '@ngrx/store';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
// import { InfluxDBService } from '@core/services';



@Component({
    selector: 'hydro-applications-stage-detail',
    templateUrl: './applications-stage-detail.component.html',
    styleUrls: ['./applications-stage-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsStageDetailComponent implements OnInit, OnDestroy {
    @ViewChild('chart') chartRef: ElementRef;
    public id: number;
    public applications: Application[] = [];
    public application: Application;
    public publicPath = '';

    public chart: Highcharts.ChartObject;
    public confidenceChart: any;
    public chartData = {
        labels: [],
        datasets: []
    };
    public signatureName: any[];

    // private series: { name: string, data: any[] }[] = [];

    constructor(
        public store: Store<HydroServingState>,
        // private influxdbService: InfluxDBService,
    ) { }

    ngOnInit() { }

    ngOnDestroy() { }

    // private initChart() {
    //     const chartRef = this.chartRef.nativeElement;

    //     this.chart = chart(chartRef, {
    //         credits: {
    //             enabled: false
    //         },
    //         chart: {
    //             type: 'line'
    //         },
    //         title: {
    //             text: 'Rate of bytes (in and out)'
    //         },
    //         xAxis: {
    //             title: {
    //                 text: 'Time'
    //             },
    //             categories: [],
    //             gridLineWidth: 1,
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Rate (b/s)'
    //             }
    //         },
    //         tooltip: {
    //             shared: true
    //         },
    //         plotOptions: {
    //             column: {
    //                 grouping: false,
    //                 shadow: false,
    //                 borderWidth: 0
    //             }
    //         },
    //         series: [{
    //             name: 'Series 1',
    //             data: []
    //         }, {
    //             name: 'Series 2',
    //             data: []
    //         }]
    //     });
    // }

    // private getChartData(application: Application) {
    //     this.series = [];
    //     const stage = application.executionGraph.stages[0];
    //     const service = stage.services[0];
    //     const modelVersionId = service.serviceDescription.modelVersionId;
    //     const runtimeId = service.serviceDescription.runtimeId;
    //     const environmentId = service.serviceDescription.environmentId ? service.serviceDescription.environmentId : 0;
    //     const id = `r${runtimeId}m${modelVersionId}e${environmentId}`;

    //     Promise.all([
    //         this.getMetric(id, 'envoy_cluster_upstream_cx_rx_bytes_total'),
    //         this.getMetric(id, 'envoy_cluster_upstream_cx_tx_bytes_total')]
    //     ).then(() => {
    //         this.updateChart();
    //     });
    // }

    // private updateChart() {
    //     const categories = [];
    //     this.chart.xAxis[0].setCategories(categories);
    //     this.series.forEach(series => {
    //         series.data.forEach((element, index) => {
    //             categories.push(moment(element.time).format('HH:mm'));
    //             if (element.derivative < 0) {
    //                 series.data[index] = 0;
    //             } else {
    //                 series.data[index] = element.derivative;
    //             }
    //         });
    //     });
    //     this.chart.xAxis[0].setCategories(categories);
    //     this.chart.update({
    //         series: this.series
    //     });
    // }

    // private getMetric(serviceId: string, metricType: string) {
    //     const requestType = 'derivative(sum("value"),10s)';
    //     const requestFilter = `("envoy_cluster_name" = '${serviceId}') AND time >= now() - 30m GROUP BY time(1m)`;
    //     const query = `SELECT ${requestType} FROM "${metricType}" WHERE ${requestFilter}`;
    //     return this.influxdbService.search(query)
    //         .then(res => {
    //             this.series.push({
    //                 name: metricType,
    //                 data: res
    //             });
    //         });
    // }
}
