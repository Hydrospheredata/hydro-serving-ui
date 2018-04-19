import { Component, OnInit } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { DialogBase } from '@shared/base/_index';
// import * as Actions from '@shared/actions/_index';
import { ApplicationState } from '@shared/models/_index';
import { FormsService, ApplicationsService } from '@shared/services/_index';



@Component({
    selector: 'hydro-dialog-add-source',
    templateUrl: './dialog-add-source.component.html',
    styleUrls: ['./dialog-add-source.component.scss']
})
export class DialogAddSourceComponent extends DialogBase implements OnInit {

    public sourceForm: FormGroup;
    public sourceType: string;

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<ApplicationState>,
        public applicationsService: ApplicationsService
    ) {
        super(
            dialogRef
        );
    }

    ngOnInit() {
        this.sourceType = 's3';
        this.createForm();
        this.initFormChangesListener();
    }

    public onSubmit() { }

    private createForm() { }

    private initFormChangesListener() {
        this.sourceForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

}
