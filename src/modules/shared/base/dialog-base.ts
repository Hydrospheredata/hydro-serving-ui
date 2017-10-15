import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { DialogBaseComponent } from '@shared/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService, Service } from '@shared/models/_index';
import { FormsService, ServicesService } from '@shared/services/_index';



@Injectable()
export class DialogBase {
    public labels = {
        kafka: {
            input: 'input topic = ',
            output: 'output topic = ',
            bootstrapServers: 'bootstrapServers = ',
        },
        weight: 'Weight'
    }
    public wrapToInlineControlClass: string = 'form-group__inline';
    public weightInputClass: string = '__modelWeight';
    public kafkaInputClass: string = '__kafkaInput';

    public serviceForm: FormGroup;
    public isKafkaEnabled: boolean = false;
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
    public modelServicesFiltered: ModelService[];

    public modelVersions: ModelService[] = [];

    public services: Service[];

    public weightsForSlider: any[] = [100];

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<AppState>,
        public servicesService: ServicesService
    ) {
        this.store.select('modelService')
            .subscribe(modelService => {
                this.modelServices = modelService.filter(item => {
                    return item.modelRuntime.runtimeType && item.serviceId > 0;
                });
                this.modelServicesFiltered = this.modelServices.filter((item, index, self) => {
                    return self.findIndex(t => { return t.modelRuntime.modelId === item.modelRuntime.modelId}) === index;
                });
            });
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
    }

    public createServiceForm() {
        this.serviceForm = this.fb.group({
            serviceName: ['', Validators.required],
            weights: this.fb.array([this.addWeightToModel()]),
            kafkaStreamingSources: this.fb.array([this.addKafkaSource()])
        });
    }

    public addWeightToModel(model?) {
        return this.fb.group({
            selectedModel: ['', Validators.required],
            model: [model ? model : '', [Validators.required]],
            weight: ['100', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]]
        });
    }

    public addKafkaSource() {
        return this.fb.group({
            serviceId: ['0'],
            sourceTopic: [''],
            destinationTopic: [''],
            brokerList: ['']
        });
    }

    public initFormChangesListener() {
        this.serviceForm.valueChanges.subscribe((form) => {

            let result = 0;
            // todo fix errors reset
            this.formErrors.weights = '';
            this.formErrors.serviceId = '';
            form.weights.forEach(service => {
                result += +service.weight;
            });

            if (result != 100) {
                this.serviceForm.controls.weights.setErrors({ overflow: true });
            }

            if (this.serviceForm.invalid) {
                this.formsService.setErrors(this.serviceForm, this.formErrors, this.formsService.MESSAGES.ERRORS.forms.service);
            }
        });
    }

    public addModelToService(model?) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.push(this.addWeightToModel(model));
    }

    public addKafkaToService() {
        const control = <FormArray>this.serviceForm.controls['kafkaStreamingSources'];
        control.push(this.addKafkaSource());
    }

    public removeKafkaFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['kafkaStreamingSources'];
        control.removeAt(i);
    }

    public removeModelFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.removeAt(i);
    }

    public onSelectModel(value) {
        this.modelVersions = this.modelServices.filter((item, index, self) => {
            return item.modelRuntime.modelId === value;
        });
    }

    public onAddingModel(value) {
        this.addModelToService(value);
        this.weightsForSlider.push(0);
    }

    public getFormData(data) {

        console.log(data);

        let weights: {serviceId: number, runtimeId: number, weight: number}[] = [];
        let kafkaStreamingSources: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[] = [];

        data.value.weights.forEach(self => {
            console.log(self);
            weights.push({
                serviceId: self.model.serviceId,
                runtimeId: self.model.modelRuntime.id,
                weight: Number(self.weight)
            });
        });

        data.value.kafkaStreamingSources.forEach(kafka => {
            if (this.isKafkaEnabled) {
                kafkaStreamingSources.push({
                    serviceId: kafka.serviceId,
                    sourceTopic: kafka.sourceTopic,
                    destinationTopic: kafka.destinationTopic,
                    brokerList: kafka.brokerList instanceof Array ? kafka.brokerList : kafka.brokerList.split(/[#;,\/|()[\]{}<>( )]/g)
                });
            }
        });

        return {
            weights: weights,
            kafkaStreamingSources: kafkaStreamingSources
        };
    }

}
