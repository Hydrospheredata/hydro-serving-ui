import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference } from '@angular-mdl/core';
import { WeightedServiceStore } from '@stores/weighted-service.store';
import { WeightedService } from '@models/weighted-service';
import { ModelStore } from '@stores/model.store';
import { ModelServiceStore } from '@stores/model-service.store';
import { FormsService } from '@services/form-service.service';
import { MdlSnackbarService } from '@angular-mdl/core';


@Component({
    selector: 'hydro-dialog-add-service',
    templateUrl: './dialog-add-service.component.html',
    styleUrls: ['./dialog-add-service.component.scss'],
    providers: [FormsService]
})
export class DialogAddServiceComponent implements OnInit {

    public models;
    public form: FormGroup;
    public selectedWeightedService: WeightedService;
    public formTitle: string;
    public formErrors = {
        serviceName: '',
        weights: '',
        serviceId: '',
        weight: ''
    };

    constructor(
        private fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        private weightedServiceStore: WeightedServiceStore,
        private modelStore: ModelStore,
        private formsService: FormsService,
        private modelServiceStore: ModelServiceStore,
        private mdlSnackbarService: MdlSnackbarService
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            serviceName: ['', Validators.required],
            weights: this.fb.array([this.createSelectForm()])
        });
    }

    createSelectForm() {
        return this.fb.group({
            serviceId: ['', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]],
            weight: ['', [Validators.required, Validators.pattern(this.formsService.VALIDATION_PATTERNS.number)]]
        });
    }

    onSubmit() {

    }

}
