import { Component, ViewEncapsulation, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';
import { Chart } from "chart.js";

import { Store } from '@ngrx/store';
import { 
    AppState, 
    Application,
    Runtime
} from '@shared/models/_index';

import { environment } from '@environments/environment';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogTestComponent,
    injectableTestOptions,
    injectableApplicationId,
    injectableServiceUpdate
} from '@components/dialogs/_index';

declare var EventSource:any;



@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent {
    public JSON = JSON;
    public id: string = '';
    public serviceModels: any[] = [];
    public serviceModelsFiltered: any[];
    public applications: Application[] = [];
    public application: Application;
    public publicPath: string = '';

    public runtimes: Runtime[];

    public fullHeight: boolean = false;

    public tableHeader: string[] = ['Model', 'Version', 'Created Date', 'Weight'];

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
    public chart: any;
    public chartData = {
        labels: [],
        datasets: []
    };

    private eventSourcePath = "http://localhost:9999/v1/measure/streaming";
    private eventSourceAlerts: any;
    private eventSourceMeasures: any;
    private storeSub: Subscription;
    private activeRouteSub: Subscription;
    private runtimesStoreSub: Subscription;

    constructor(
        public store: Store<AppState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        // private modelServicesService: ModelServicesService,
        private router: Router,
        private changeDetector: ChangeDetectorRef,
        private elementRef: ElementRef,
        private renderer: Renderer2,
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
                if (this.eventSourceAlerts) {
                    this.eventSourceAlerts.close();
                }
                if (this.eventSourceMeasures) {
                    this.eventSourceMeasures.close();   
                }
                this.loadInitialData(id);
            });
    }

    ngAfterContentInit() {
        this.initChart();
    }

    public node: string;

    public initChart() {
        Chart.defaults.global.defaultFontColor = '#04143c';
        Chart.defaults.global.defaultFontFamily = '"Museo Sans Regular"';
        
        let containerRef = this.elementRef.nativeElement.querySelector('.content');
        let chartRef = this.renderer.createElement('canvas');
        this.renderer.appendChild(containerRef, chartRef);
        
        this.chart = new Chart(chartRef, {
                type: 'bar',
                data: this.chartData,
                options: {
                    animate: false,
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Application graph',
                        fontSize: 20,
                    },
                    scales: {
                        yAxes: [{
                            id: 'left-y-axis',
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                labelString: 'Confidence',
                                fontSize: 16,
                            }
                        }, {
                            id: 'right-y-axis',
                            type: 'linear',
                            position: 'right',
                            scaleLabel: {
                                display: true,
                                labelString: 'Classes\' average values',
                                fontSize: 16,
                            }
                        }],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Timeline',
                                    fontSize: 16,
                                }
                            }
                        ]
                    }
                }
            });
    }

    loadInitialData(id) {
        this.runtimesStoreSub = this.store.select('runtimes')
            .subscribe(runtimes => this.runtimes = runtimes);
        
        this.storeSub = this.store.select('applications')
            .filter(applications => applications.length > 0)
            .subscribe(applications => {
                if (applications.length) {
                    this.applications = applications;
                    this.getApplicationData(id);
                }
            });

        this.eventSourceAlerts = new EventSource(`${this.eventSourcePath}/alerts`);
        this.eventSourceMeasures = new EventSource(`${this.eventSourcePath}/measures`);

        
        this.eventSourceAlerts.onopen = (e) => { console.log(`Connected to ${ e.target.url}`) };
        this.eventSourceMeasures.onopen = (e) => { console.log(`Connected to ${ e.target.url}`) };
        
        this.eventSourceAlerts.onmessage = (e) => { 
            if (e.data.length) {
                let response = JSON.parse(e.data);
                this.alerts.push(response.description);
                this.changeDetector.detectChanges();
            };
        }
        let classToData = {};
        this.eventSourceMeasures.onmessage = (e) => { 
            if (e.data.length) {
                let serverResponse = JSON.parse(e.data);
                let labels: string[] = [];
                console.log(serverResponse);

                let measureClasses = serverResponse.measures.map(m => m.class);
                measureClasses.sort();
                let newData = measureClasses
                    .map(l => serverResponse.measures.filter(m => m.class === l)[0])
                    .map(entry => entry.cumulativeSum * 100 / entry.total);

                measureClasses.forEach((label, i) => {
                    if (-1 === Object.keys(classToData).indexOf(label)) {
                        classToData[label] = {
                            lineData: [],
                            barData: []
                        }
                    } else {
                        if (classToData[label].lineData.length > 8) { classToData[label].lineData.shift(); }
                        if (classToData[label].barData.length > 8) { classToData[label].barData.shift(); }

                        let measureValue = newData[i];
                        let confidenceValue = Object.keys(serverResponse.confidences).indexOf(label) !== -1 ?
                            serverResponse.confidences[label] * 100 : 0;

                        i === 0 ? labels.push('n') : labels.push(`n-${i}`);
                        classToData[label].lineData.push(measureValue);
                        classToData[label].barData.push(confidenceValue);

                    }
                });

                let measuresDatasets = Object.keys(classToData).map((label, i) => {
                    return {
                        type: 'line',
                        label: `${label} average`,
                        backgroundColor: this.dummyColorPicker(i),
                        borderColor: this.dummyColorPicker(i, 0.9),
                        fill: false,
                        data: classToData[label].lineData,
                        yAxisID: 'right-y-axis'
                    };
                });

                let confidenceDatasets = Object.keys(classToData).map((label, i) => {
                    return {
                        type: 'bar',
                        label: label,
                        backgroundColor: this.dummyColorPicker(i, 0.5),
                        data: classToData[label].barData,
                        yAxisID: 'left-y-axis'
                    };
                });

                // console.log(measuresDatasets)
                // console.log(confidenceDatasets)

                let datasets = [...measuresDatasets, ...confidenceDatasets];

                console.log(datasets);
                console.log('_____________');

                this.chart.data.labels = labels.reverse();
                this.chart.data.datasets = datasets;
                this.chart.update({
                    duration: 0
                });
            };
        }
    }

    dummyColorPicker(i = 0, opacity = 1) {
        let base = {
            r: 255 - i*20,
            g: 0 + i*20,
            b: 50 + i*10
        };

        return `rgba(${base.r}, ${base.g}, ${base.b}, ${opacity})`
    }

    ngOnDestroy() {
        this.eventSourceAlerts.close();
        this.eventSourceMeasures.close();
        if (this.activeRouteSub) {
            this.activeRouteSub.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
        if (this.runtimesStoreSub) {
            this.runtimesStoreSub.unsubscribe();   
        }
    }

    getApplicationData(id: string) {
        this.serviceModels = [];
        if (this.applications.length) {
            this.application = this.applications.filter(application => application.id === Number(id)).shift();
            // if (this.isPipeline(this.application)) {
            //     this.title = `Pipeline: ${this.application.name}`;
            // } else {
            //     this.title = this.application.name;
            //     this.application.executionGraph.stages[0].forEach(weight => {
            //         this.getModelServiceData(weight);
            //     });
            // }
        }
    }

    // public isPipeline(application: Application): boolean {
    //     return application && application.executionGraph.stages.length !== 1;
    // }

    getModelServiceData(weight) {
        console.log(weight);
        // TODO: Add effect to prevent get if exist in store, something like CACHE
        // this.modelServicesService.getModelService(weight.service ? weight.service.serviceId : weight.serviceId)
        //     .subscribe(data => {
        //         console.log(data);
        //         this.serviceModels.push({ data: data, weight: weight.weight });
        //         if (this.serviceModels.length) {
        //             this.serviceModelsFiltered = this.serviceModels.filter((item, index, self) => {
        //                 return self.findIndex(t => { return t.data.serviceId === item.data.serviceId;}) === index;
        //             });
        //         }
        //     });
    }

    public getRuntimeInfo(runtimeId: number) {
        console.log(this.runtimes.find(runtimes => runtimes.id === runtimeId));
        const runtime = this.runtimes.find(runtimes => runtimes.id === runtimeId);
        return runtime.name;
    }

    public testApplication(application: Application) {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: {'width': '600px', 'min-height': '250px'},
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
            styles: {'width': '900px', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceUpdate, useValue: application}]
        });
    }

    public removeApplication(id: number) {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: {'width': '600px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableApplicationId, useValue: id}]
        });
    }


}
