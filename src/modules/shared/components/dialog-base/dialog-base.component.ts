import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { ServicesService, FormsService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState, ModelService, Service } from '@shared/models/_index';

export let injectableServiceUpdate = new InjectionToken<Service>('selectedService');

@Component({
  selector: 'hydro-dialog-base',
  templateUrl: './dialog-base.component.html',
  styleUrls: ['./dialog-base.component.scss']
})
export class DialogBaseComponent extends DialogBase implements OnInit {

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<AppState>,
        public servicesService: ServicesService
    ) {
        super(
            fb,
            dialogRef,
            formsService,
            mdlSnackbarService,
            store,
            servicesService
        );
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
    }

    ngOnInit() {
        this.createServiceForm();
        this.initFormChangesListener();
    }

}
