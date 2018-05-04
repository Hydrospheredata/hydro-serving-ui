import * as moment from 'moment';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';
import { chart } from 'highcharts';

import { Store } from '@ngrx/store';
import { ApplicationState, Application } from '@shared/models/_index';
import { InfluxDBService } from '@shared/services/_index';
import { environment } from '@environments/environment';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogTestComponent,
    injectableTestOptions,
    injectableApplicationId,
    injectableServiceUpdate
} from '@components/dialogs/_index';



@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent implements OnInit, OnDestroy {
    public JSON = JSON;
    public id = '';
    public applications: Application[] = [];
    public application: Application;
    public publicPath = '';

    public chart: any;
    public confidenceChart: any;
    public chartData = {
        labels: [],
        datasets: []
    };
    public signatureName: any[];

    private chartRef;
    private storeSub: Subscription;
    private activeRouteSub: Subscription;

    constructor(
        public store: Store<ApplicationState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private influxdbService: InfluxDBService,
        private elementRef: ElementRef,
    ) {
        this.activeRouteSub = this.activatedRoute.params
            .map(params => {
                this.id = params['id'];
                return this.id;
            })
            .subscribe(id => {
                this.publicPath = `${environment.host}:${environment.port}${environment.apiUrl}${this.router.url}`;
                if (this.storeSub) {
                    this.storeSub.unsubscribe();
                }
                this.loadInitialData(id);
            });
    }

    ngOnInit() {
        this.initChart();
    }

    ngOnDestroy() {
        if (this.activeRouteSub) {
            this.activeRouteSub.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    public testApplication(application: Application) {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: { 'width': '900px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableTestOptions, useValue: application }]
        });
    }

    public editApplication(application: Application) {
        this.dialog.showCustomDialog({
            component: DialogUpdateServiceComponent,
            styles: { 'width': '100%', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto', 'max-width': '1224px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableServiceUpdate, useValue: application }]
        });
    }

    public removeApplication(id: number) {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: { 'width': '600px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableApplicationId, useValue: id }]
        });
    }

    private loadInitialData(id) {
        this.storeSub = this.store.select('applications')
            .filter(applications => applications.length > 0)
            .map(applications => applications.filter(application => application.id === Number(id))[0])
            .subscribe(application => {
                this.application = application;
                if (this.application) {
                    this.signatureName = this.application.contract.match(/signature_name: \"(.*)\"\n/);
                    this.getChartData(application);
                }
            });
    }

    private initChart() {
        console.log('123');
        this.chartRef = this.elementRef.nativeElement.querySelector('#chart');

        this.chart = chart(this.chartRef, {
            credits: {
                enabled: false
            },
            chart: {
                type: 'line'
            },
            title: {
                text: 'Rate of bytes (in and out)'
            },
            xAxis: {
                title: {
                    text: 'Time'
                },
                categories: [],
                gridLineWidth: 1,
            },
            yAxis: {
                title: {
                    text: 'Rate (b/s)'
                }
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: []
        });
    }

    private getChartData(application: Application) {
        const modelVersionId = application.executionGraph.stages[0].services[0].serviceDescription.modelVersionId;
        const runtimeId = application.executionGraph.stages[0].services[0].serviceDescription.runtimeId;
        let environmentId = 0;
        if (application.executionGraph.stages[0].services[0].serviceDescription.environmentId) {
            environmentId = application.executionGraph.stages[0].services[0].serviceDescription.environmentId;
        }
        const id = `r${runtimeId}m${modelVersionId}e${environmentId}`;
        const sql_request = 'derivative(sum("value"),10s)';
        const filter = `("envoy_cluster_name" = '${id}') AND time >= now() - 30m GROUP BY time(1m)`;
        const rx_query = `SELECT ${sql_request} FROM "envoy_cluster_upstream_cx_rx_bytes_total" WHERE ${filter}`;
        const tx_query = `SELECT ${sql_request} FROM "envoy_cluster_upstream_cx_tx_bytes_total" WHERE ${filter}`;
        if (this.chart) {
            this.initChart();
        }
        this.influxdbService.search(rx_query)
            .then(res => {
                this.chart.addSeries({
                    name: 'IN',
                    data: []
                });
                this.updateChart(0, res);
            });
        this.influxdbService.search(tx_query)
            .then(res => {
                this.chart.addSeries({
                    name: 'OUT',
                    data: []
                });
                this.updateChart(1, res);
            });
    }

    private updateChart(seriesId, data) {
        console.log(seriesId, data);
        const categories = [];
        const values = [];
        data.forEach(element => {
            categories.push(moment(element.time).format('HH:mm'));
            if (element.derivative < 0) {
                values.push(0);
            } else {
                values.push(element.derivative);
            }
        });
        if (this.chart.xAxis[0].categories.length === 0) {
            this.chart.xAxis[0].setCategories(categories);
        }
        if (this.chart.series.length > 0) {
            this.chart.series[seriesId].setData(values);
        }
    }
}
