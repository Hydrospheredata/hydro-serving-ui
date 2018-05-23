// import * as moment from 'moment';
import {
    Component, ViewEncapsulation, OnInit, OnDestroy,
    // ElementRef,
    // ViewChild,
    AfterViewInit
} from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';
// import { chart } from 'highcharts';
// import * as Highcharts from 'highcharts';

import { Store } from '@ngrx/store';
import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
// import { InfluxDBService } from '@core/services/_index';
// import { environment } from '@environments/environment';

import * as fromApplications from '@applications/reducers';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogTestComponent,
    injectableTestOptions,
    injectableApplicationId,
    injectableServiceUpdate
} from '@components/dialogs/_index';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent implements OnInit, AfterViewInit, OnDestroy {
    // @ViewChild('chart') chartRef: ElementRef;
    public id: number;
    public applications: Application[] = [];
    public application: Application;
    public publicPath = '';

    public application$: Observable<Application>;

    // public chart: Highcharts.ChartObject;
    // public confidenceChart: any;
    // public chartData = {
    //     labels: [],
    //     datasets: []
    // };
    public signatureName: any[];

    // private series: { name: string, data: any[] }[] = [];
    private activeRouteSub: Subscription;

    constructor(
        public store: Store<HydroServingState>,
        public dialog: MdlDialogService,
        // private activatedRoute: ActivatedRoute,
        // private router: Router,
        // private influxdbService: InfluxDBService,
    ) {
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        // this.activeRouteSub = this.activatedRoute.params
        //     .map(params => {
        //         this.id = Number(params['id']);
        //         return this.id;
        //     })
        //     .subscribe(id => {
        //         console.log(id);
        //         this.publicPath = environment.production ?
        //             `http://${window.location.hostname}:${window.location.port}${environment.apiUrl}${this.router.url}` :
        //             `${environment.host}:${environment.port}${environment.apiUrl}${this.router.url}`;
        //         // this.loadInitialData(id);
        //     });
    }

    ngOnInit() { }

    ngAfterViewInit() {
        // this.initChart();
    }

    ngOnDestroy() {
        if (this.activeRouteSub) {
            this.activeRouteSub.unsubscribe();
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

    // private loadInitialData(id: number) {
    //     this.store.select(fromApplications.getApplicationById(id))
    //         .subscribe(application => {
    //             this.application = application;
    //             if (this.application) {
    //                 this.signatureName = application.contract.match(/signature_name: \"(.*)\"\n/);
    //                 this.getChartData(application);
    //             }
    //         });
    // }

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
