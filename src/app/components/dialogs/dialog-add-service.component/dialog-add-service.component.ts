import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { DialogBaseComponent } from '@shared/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService, Service } from '@shared/models/_index';
import { FormsService, ModelServicesService, ServicesService } from '@shared/services/_index';



@Component({
  selector: 'hydro-dialog-add-service',
  templateUrl: './dialog-add-service.component.html',
  styleUrls: ['./dialog-add-service.component.scss'],
  providers: [FormsService]
})
export class DialogAddServiceComponent implements OnInit {
    private labels = {
        kafka: {
            input: 'input topic = ',
            output: 'output topic = ',
            bootstrapServers: 'bootstrapServers = ',
        },
        weight: 'Weight'
    }
    private wrapToInlineControlClass: string = 'form-group__inline';
    private weightInputClass: string = '__modelWeight';
    private kafkaInputClass: string = '__kafkaInput';
    
    private serviceForm: FormGroup;
    private isKafkaEnabled: boolean = false;
    public addSelectLabel: string = 'choose model';
    
    public selectedService: Service;
    public formTitle: string;
    public formErrors = {
        serviceName: '',
        weights: '',
        serviceId: '',
        modelVersion: '',
        weight: '',
    };
    public modelServices: ModelService[];

    public modelVersions: string[] = [];

    public services: Service[];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        private formsService: FormsService,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<AppState>,
        private servicesService: ServicesService,
        private modelServicesService: ModelServicesService
    ) {
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
        this.store.select('modelService')
            .subscribe(modelService => {
                this.modelServices = modelService;
            });
    }

    ngOnInit() {
        this.createServiceForm();
        this.initFormChangesListener();
    }

    private createServiceForm() {
        this.serviceForm = this.fb.group({
            serviceName: ['', Validators.required],
            weights: this.fb.array([this.addWeightToModel()]),
            kafkaStreamingSources: this.fb.array([this.addKafkaSource()])
        });
    }

    private addWeightToModel(model?: string) {
        return this.fb.group({
            serviceId: [model ? model : '', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]],
            weight: ['0', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]]
        });
    }

    private addKafkaSource() {
        return this.fb.group({
            serviceId: [0],
            sourceTopic: [''],
            destinationTopic: [''],
            brokerList: [['']]
        });
    }

    private initFormChangesListener() {
        this.serviceForm.valueChanges.subscribe((form) => {

            let result = 0;
            // todo fix errors reset
            this.formErrors.weights = '';
            this.formErrors.serviceId = '';
            form.weights.forEach(service => {
                result += +service.weight;
            });

            if (result > 100) {
                this.serviceForm.controls.weights.setErrors({ overflow: true });
            }

            if (this.serviceForm.invalid) {
                this.formsService.setErrors(this.serviceForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.service);
            }
        });
    }

    addModelToService(model?: string) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.push(this.addWeightToModel(model));
    }

    addKafkaToService() {
        const control = <FormArray>this.serviceForm.controls['kafkaStreamingSources'];
        control.push(this.addKafkaSource());
    }

    removeModelFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.removeAt(i);
    }

    onChooseModel(value) {
        console.log(typeof value);
        this.addModelToService(value);
    }

    onSubmit() {
        console.log(this.serviceForm)
        
        // if (this.serviceForm.invalid) {
        //     return;
        // }

        let weights: {serviceId: number, weight: number}[] = [];
        let kafkaStreamingSources: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[] = [];

        this.serviceForm.value.weights.forEach(model => {
            weights.push({
                serviceId: model.serviceId,
                weight: Number(model.weight) 
            });
        });

        this.serviceForm.value.kafkaStreamingSources.forEach(kafka => {
            kafkaStreamingSources.push({
                serviceId: 0,
                sourceTopic: kafka.sourceTopic,
                destinationTopic: kafka.destinationTopic,
                brokerList: kafka.brokerList[0] ? kafka.brokerList.split(/[#;,\/|()[\]{}<>( )]/g) : kafka.brokerList
            });
        });

        const serviceInfo = {
            id: this.services.length ? this.services[this.services.length - 1].id + 1 : 1,
            serviceName: this.serviceForm.value.serviceName,
            kafkaStreamingSources: kafkaStreamingSources,
        };

        const service = new Service(Object.assign( serviceInfo, { weights: weights } ));

        console.log(service);

        this.servicesService.addService(service)
            .subscribe(services => {
                this.store.dispatch({ type: Actions.ADD_SERVICE, payload: service });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully added',
                    timeout: 5000
                });
            });
    }

}
