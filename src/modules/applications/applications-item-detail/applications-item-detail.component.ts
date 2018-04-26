// import * as moment from 'moment';
import {
    Component, ViewEncapsulation, AfterContentInit, OnDestroy,
    // ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';
// import { chart } from 'highcharts';

import { Store } from '@ngrx/store';
import { ApplicationState, Application } from '@shared/models/_index';
// import { ElasticService } from '@shared/services/_index';
import { environment } from '@environments/environment';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogTestComponent,
    injectableTestOptions,
    injectableApplicationId,
    injectableServiceUpdate
} from '@components/dialogs/_index';

// declare var EventSource: any;



@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent implements AfterContentInit, OnDestroy {
    public JSON = JSON;
    public id = '';
    public applications: Application[] = [];
    public application: Application;
    public publicPath = '';

    public chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Application graph',
            fontSize: 24,
            fontFamily: '"Museo Sans Regular"',
            fontColor: '#04143c'
        },
        tooltips: {
            mode: 'index',
            intersect: true
        }
    };

    public alerts: any[] = [];
    public averageChart: any;
    public confidenceChart: any;
    public chartData = {
        labels: [],
        datasets: []
    };

    public signatureName: any[];

    // private eventSourcePath: string;
    // private eventSourceMeasures: any;
    private storeSub: Subscription;
    private activeRouteSub: Subscription;

    constructor(
        public store: Store<ApplicationState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        // private elasticService: ElasticService,
        // private elementRef: ElementRef,
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

    ngAfterContentInit() {
        // this.elasticService.connect();
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
                    // this.getElasticData(application);
                }
                // this.initChartData();
            });
    }

    // private initChartData() {
    //     const publicUrl = `${window.location.protocol}//${window.location.hostname}/v1/measure/streaming`;
    //     const localUrl = `${window.location.protocol}//${window.location.hostname}:9999/v1/measure/streaming`;
    //     this.eventSourcePath = environment.production ? publicUrl : localUrl;

    //     this.eventSourceMeasures = new EventSource(`${this.eventSourcePath}/measures`);

    //     this.alerts = [];

    //     let classToData = {};
    //     const chartConfidenceData = [];
    //     let eventIndex: number = 0;
    //     this.eventSourceMeasures.onmessage = (e) => {
    //         if (e.data.length) {
    //             const response = JSON.parse(e.data);

    //             if (response.applicationId === this.application.name) {

    //                 const confidences = response.confidences;
    //                 const measures = response.measures;

    //                 for (const key in confidences) {
    //                     if (confidences.hasOwnProperty(key)) {
    //                         if (chartConfidenceData.find(item => item.name === key) === undefined) {
    //                             chartConfidenceData.push({ name: key, data: confidences[key] });
    //                         } else {
    //                             chartConfidenceData.find(item => item.name === key).data = confidences[key];
    //                         }
    //                     }
    //                 }

    //                 const labels: string[] = [];
    //                 const chartData: number[] = [];

    //                 chartConfidenceData.map(item => {
    //                     labels.push(item.name);
    //                     chartData.push(item.data);
    //                 });

    //                 this.confidenceChart.xAxis[0].update({ categories: labels });
    //                 this.confidenceChart.series[0].setData(chartData, false);
    //                 this.confidenceChart.redraw();


    //                 const measureClasses = measures.map(m => m.class);
    //                 measureClasses.sort();

    //                 const cumulativeSumData = measureClasses
    //                     .map(l => measures.filter(m => m.class === l)[0])
    //                     .map(entry => entry.cumulativeSum);

    //                 const totalData = measureClasses
    //                     .map(l => measures.filter(m => m.class === l)[0])
    //                     .map(entry => entry.total);

    //                 this.averageChart.xAxis[0].update({ categories: measureClasses });
    //                 this.averageChart.series[0].setData(cumulativeSumData, false);
    //                 this.averageChart.series[1].setData(totalData, false);
    //                 this.averageChart.redraw();

    //                 // measureClasses.forEach((label, i) => {
    //                 //     if (-1 === Object.keys(classToData).indexOf(label)) {
    //                 //         classToData[label] = {
    //                 //             averageValues: [],
    //                 //             confidenceValues: []
    //                 //         }
    //                 //     } else {
    //                 //         if (classToData[label].averageValues.length > 8) { classToData[label].averageValues.shift(); }
    //                 //         if (classToData[label].confidenceValues.length > 8) { classToData[label].confidenceValues.shift(); }

    //                 //         let measureValue = newData[i];
    //                 //         let confidenceValue = Object.keys(response.confidences).indexOf(label) !== -1 ?
    //                 //             response.confidences[label] * 100 : 0;

    //                 //         i === 0 ? labels.push('n') : labels.push(`n-${i}`);
    //                 //         classToData[label].averageValues.push(measureValue);
    //                 //         classToData[label].confidenceValues.push(confidenceValue);

    //                 //     }
    //                 // });

    //                 // let measuresDatasets = Object.keys(classToData).map((label, i) => {
    //                 //     return {
    //                 //         type: 'line',
    //                 //         label: `${label} average`,
    //                 //         backgroundColor: this.dummyColorPicker(i),
    //                 //         borderColor: this.dummyColorPicker(i, 0.9),
    //                 //         fill: false,
    //                 //         data: classToData[label].averageValues,
    //                 //         yAxisID: 'left-y-axis'
    //                 //     };
    //                 // });

    //                 // let confidenceDatasets = Object.keys(classToData).map((label, i) => {
    //                 //     return {
    //                 //         type: 'bar',
    //                 //         label: label,
    //                 //         backgroundColor: this.dummyColorPicker(i, 0.5),
    //                 //         data: classToData[label].confidenceValues,
    //                 //         yAxisID: 'left-y-axis'
    //                 //     };
    //                 // });

    //                 // this.averageChart.data.labels = labels.reverse();
    //                 // this.averageChart.data.datasets = measuresDatasets;
    //                 // this.confidenceChart.data.datasets = confidenceDatasets;
    //                 // this.averageChart.update({
    //                 //     duration: 0
    //                 // });
    //                 // this.confidenceChart.update({
    //                 //     duration: 0
    //                 // });
    //             }
    //         }
    //     };
    // }

    // private getElasticData(application: Application) {
    //     const modelVersionId = application.executionGraph.stages[0].services[0].serviceDescription.modelVersionId;
    //     const runtimeId = application.executionGraph.stages[0].services[0].serviceDescription.runtimeId;
    //     let environmentId;
    //     if (application.executionGraph.stages[0].services[0].serviceDescription.environmentId) {
    //         environmentId = application.executionGraph.stages[0].services[0].serviceDescription.environmentId;
    //     }
    //     this.elasticService.search(`r${runtimeId || 0}m${modelVersionId || 0}e${environmentId || 0}`)
    //         .then(res => {
    //             this.initChart(res.hits.hits);
    //             console.log(res.hits.hits);
    //         });
    // }

    // private initChart(elasticData) {
    //     const categories = [];
    //     const values = [];
    //     elasticData.forEach(element => {
    //         categories.push(moment(element._source['@timestamp']).format('HH:mm'));
    //         values.push(element._source.value);
    //     });
    //     // console.log(values);

    //     const chartRef = this.elementRef.nativeElement.querySelector('#chart');

    //     this.averageChart = chart(chartRef, {
    //         credits: {
    //             enabled: false
    //         },
    //         chart: {
    //             type: 'line'
    //         },
    //         xAxis: {
    //             title: {
    //                 text: 'Time'
    //             },
    //             categories: categories
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Values'
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
    //             name: 'Values',
    //             data: values
    //         }]
    //     });
    // }
}
