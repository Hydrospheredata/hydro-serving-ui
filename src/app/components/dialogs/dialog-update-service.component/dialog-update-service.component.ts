import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ServicesService, Service, FormsService } from '@shared/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Service>('selectedService');



@Component({
  selector: 'hydro-dialog-update-service',
  templateUrl: './dialog-update-service.component.html',
  styleUrls: ['./dialog-update-service.component.scss'],
  providers: [FormsService]
})
export class DialogUpdateServiceComponent implements OnInit {
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

    private initFormChangesListener() {
        this.serviceForm.valueChanges.subscribe((form) => {
            let result = 0;
            // todo fix errors reset
            this.formErrors.weights = '';
            this.formErrors.serviceId = '';
            form.weights.forEach((service) => {
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

    private updateServiceFormValues(service: Service) {
        for (let i = 0; i < service.weights.length - 1; i++) {
            this.addWeightsForm();
        }
        this.serviceForm.patchValue({id: service.id});
        this.serviceForm.patchValue({serviceName: service.serviceName});
        this.serviceForm.patchValue({weights: service.weights});
    }

    private createServiceForm() {
        this.serviceForm = this.fb.group({
            id: [''],
            serviceName: ['', [Validators.required]],
            weights: this.fb.array([this.createWeightsForm()])
        });
    }

    private createWeightsForm() {
        return this.fb.group({
            serviceId: ['', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]],
            weight: ['', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]]
        });
    }

    addWeightsForm() {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.push(this.createWeightsForm());
    }

    removeWeightsForm(i: number) {
        const control = <FormArray>this.serviceForm.controls['weights'];
        control.removeAt(i);
    }

    submitServiceForm(form) {
        if (this.serviceForm.invalid) {
            return;
        }

        const formWeights = form.controls.weights;
        const weights: object[] = [];
        let service: Service;

        for ( let i = 0; i < formWeights.length; i++ ) {
            weights.push({
                serviceId: Number(formWeights.controls[i].controls.serviceId.value),
                weight: Number(formWeights.controls[i].controls.weight.value)
            });
        }

        service = {
            id: Number(form.controls.id.value),
            serviceName: form.controls.serviceName.value,
            weights: weights
        };

        this.servicesService.updateService(service)
            .subscribe(res => {
                this.store.dispatch({ type: Actions.UPDATE_SERVICE, payload: service });
                this.dialogRef.hide();
            });

    }

}
