import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ServicesService, FormsService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService, Service } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Service>('selectedService');



@Component({
  selector: 'hydro-dialog-update-service',
  templateUrl: './dialog-update-service.component.html',
  styleUrls: ['./dialog-update-service.component.scss'],
  providers: [FormsService]
})
export class DialogUpdateServiceComponent implements OnInit {
    model = {
        weight: ''
    }
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

    private isKafkaEnabled: boolean = false;
    public addSelectLabel: string = 'choose model';

    public serviceIdLabel: string = 'Models Name';
    public serviceForm: FormGroup;
    public selectedService: Service;
    public formErrors = {
        serviceName: '',
        weights: '',
        serviceId: '',
        weight: ''
    };
    public modelServices: ModelService[];

    constructor(
        @Inject(injectableServiceUpdate) data: Service,
        private store: Store<AppState>,
        private fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        private formsService: FormsService,
        private mdlSnackbarService: MdlSnackbarService,
        private servicesService: ServicesService
    ) {
        this.selectedService = data;
        console.log(this.selectedService);
        if (this.selectedService.kafkaStreamingSources.length) {
            this.isKafkaEnabled = true;
        }
        this.store.select('modelService')
            .subscribe(modelService => {
                this.modelServices = modelService;
            });
    }

    ngOnInit() {
        this.createServiceForm();
        this.initFormChangesListener();
        this.updateServiceFormValues(this.selectedService);
    }

    private createServiceForm() {
        this.serviceForm = this.fb.group({
            serviceName: ['', Validators.required],
            weights: this.fb.array([this.addWeightToModel()]),
            kafkaStreamingSources: this.fb.array([this.addKafkaSource()])
        });
    }

    private addWeightToModel() {
        return this.fb.group({
            serviceId: ['', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]],
            weight: ['100', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]]
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
            form.weights.forEach((service) => {
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

    private updateServiceFormValues(service: Service) {
        for (let i = 0; i < service.kafkaStreamingSources.length - 1; i++) {
            this.addKafkaToService();
        }
        for (let i = 0; i < service.weights.length - 1; i++) {
            this.addModelToService();
        }
        this.serviceForm.patchValue({id: service.id});
        this.serviceForm.patchValue({serviceName: service.serviceName});
        this.serviceForm.patchValue({weights: service.weights});
        this.serviceForm.patchValue({kafkaStreamingSources: service.kafkaStreamingSources});
    }

    addModelToService() {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.push(this.addWeightToModel());
    }

    addKafkaToService() {
        const control = <FormArray>this.serviceForm.controls['kafkaStreamingSources'];
        control.push(this.addKafkaSource());
    }

    removeModelFromService(i: number) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.removeAt(i);
    }

    onSubmit() {
        console.log(this.serviceForm);
        
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
            id: this.selectedService.id,
            serviceName: this.serviceForm.value.serviceName,
            kafkaStreamingSources: kafkaStreamingSources,
        };

        const service = new Service(Object.assign( serviceInfo, { weights: weights } ));

        console.log(service);

        this.servicesService.updateService(service)
            .subscribe(res => {
                this.store.dispatch({ type: Actions.UPDATE_SERVICE, payload: service });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Service was successfully updated',
                    timeout: 5000
                });
            });

    }

}
