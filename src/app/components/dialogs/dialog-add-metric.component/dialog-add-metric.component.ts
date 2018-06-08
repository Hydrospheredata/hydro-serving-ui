import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Application } from '@shared/models/application.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { DialogBase } from '@shared/base/_index';
import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { FormsService } from '@core/services';
import * as hocon from 'hocon-parser';
import * as HydroActions from '@core/actions/monitoring.actions';
import { MetricSettings } from '@shared/models/metric-settings.model';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as fromRoot from '@core/reducers';

@Component({
    selector: 'hydro-dialog-add-metric',
    templateUrl: './dialog-add-metric.component.html',
    styleUrls: ['./dialog-add-metric.component.scss'],
})

export class DialogAddMetricComponent extends DialogBase implements OnDestroy, OnInit {

    public dialogType = 'Add';
    public serviceForm: FormGroup;

    public isHealthChecked: boolean = false;
    public isHealthDisabled: boolean = true;


    public applications$: Observable<Application[]>;
    public sources$: Observable<string[]>;
    public applicationSub: Subscription;
    public application: Application;
    public stageId: number;

    public aggregations: {name: string, className: string}[] = [
        {name: "Kolmogorov-Smirnov", className: "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov"},
        {name: "Autoencoder", className: "io.hydrosphere.sonar.core.metrics.providers.Autoencoder"},
        {name: "Random Forest", className: "io.hydrosphere.sonar.core.metrics.providers.RandomForest"},
        {name: "Average", className: "io.hydrosphere.sonar.core.metrics.providers.Average"},
        {name: "Min", className: "io.hydrosphere.sonar.core.metrics.providers.Min"},
        {name: "Max", className: "io.hydrosphere.sonar.core.metrics.providers.Max"},
    ]

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<HydroServingState>,
        public router: ActivatedRoute
    ) {
        super(dialogRef);
    }

    ngOnInit() {
        this.store.select(fromRoot.getRouterParams).subscribe(x => {console.log(x)});
        this.createForm();
        this.initFormChangesListener();
        this.applications$ = this.store.select(fromApplications.getAllApplications);
        const app$ = this.store.select(fromApplications.getSelectedApplication)
        this.sources$ = app$.map(_ => {
            const parsed = hocon(_.contract);
            console.log(parsed);
            return [parsed["signatures"]["inputs"]["name"]];
        });
        this.applicationSub = app$.subscribe(_ => {
            this.application = _;
        });
    }

    onSubmit() {
        if (this.serviceForm.invalid) {
            return;
        }

        const stageId = location.pathname.split("/")[3];

        const filters = {
            sourceName: this.serviceForm.value.sourceName,
            stageId: `app${this.application.id}stage${stageId}`
        }
        
        const metricInfo = {
            metricProviderClass: this.serviceForm.value.metricAggregation,
            config: this.serviceForm.value.metricConfig,
            withHealth: this.serviceForm.value.withHealth,
            healthConfig: this.serviceForm.value.healthConfig
        }

        const metricSettings = new MetricSettings({
            name: this.serviceForm.value.metricName,
            filter: filters,
            metricProviderSpecification: new MetricSpecification(metricInfo)
        })

        console.log("Will send: ");
        console.log(metricInfo, filters);
        this.store.dispatch(new HydroActions.AddMetricAction(metricSettings));
        this.dialogRef.hide();
    }

    ngOnDestroy() {
        if (this.applicationSub) {
            this.applicationSub.unsubscribe();
        }
    }

    public initFormChangesListener() {
        this.serviceForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

    public changeConfigForm(aggregation) {
        this.isHealthDisabled = false;
        this.serviceForm.controls["withHealth"].enable();
        switch (aggregation) {
            case "io.hydrosphere.sonar.core.metrics.providers.Autoencoder":
            case "io.hydrosphere.sonar.core.metrics.providers.RandomForest":
                (<FormGroup>this.serviceForm.controls["metricConfig"]).addControl("applicationId", this.fb.control("", Validators.required));
                break;
            case "io.hydrosphere.sonar.core.metrics.providers.Average":
            case "io.hydrosphere.sonar.core.metrics.providers.Min":
            case "io.hydrosphere.sonar.core.metrics.providers.Max":
            case "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov":
                this.serviceForm.setControl("metricConfig", this.fb.group({}));
                break;
        }
        this.toggleHealthConfig();
    }

    public toggleHealthConfig() {
        this.isHealthChecked = this.serviceForm.get("withHealth").value;
        if (this.isHealthChecked) {
            switch (this.serviceForm.get("metricAggregation").value) {
                case "io.hydrosphere.sonar.core.metrics.providers.Autoencoder":
                case "io.hydrosphere.sonar.core.metrics.providers.RandomForest":
                case "io.hydrosphere.sonar.core.metrics.providers.Average":
                case "io.hydrosphere.sonar.core.metrics.providers.Min":
                case "io.hydrosphere.sonar.core.metrics.providers.Max":
                    (<FormGroup>this.serviceForm.controls["healthConfig"]).addControl("threshold", this.fb.control({disabled: false, value: ""}, Validators.required));
                    break;
                case "io.hydrosphere.sonar.core.metrics.providers.KolmogorovSmirnov":
                    this.serviceForm.setControl("healthConfig", this.fb.group({}));
                    break;
            }
        } else {
            this.serviceForm.setControl("healthConfig", this.fb.group({}));
        }
    }

    private createForm(data?) {
        this.serviceForm = this.fb.group({
            sourceName: ['', Validators.required],
            metricName: ['', Validators.required],
            metricAggregation: ['', Validators.required],
            withHealth: {value: false, disabled: true},
            metricConfig: this.fb.group({}),
            healthConfig: this.fb.group({})
        });

        if (data) {
            this.serviceForm.patchValue({
                metricName: data.name,
                metricAggregation: data.className,
            });
            // if (data.metricAggregation == "io.hydrosphere.sonar.core.metrics.providers.Autoencoder") {
            //     this.serviceForm.get("metricConfig").patchValue({
            //         applicationId: data
            //     })
            // }
        }
    }

}
