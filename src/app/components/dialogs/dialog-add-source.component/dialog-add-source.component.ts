import { Component, OnInit } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { DialogBase } from '@shared/base/_index';
// import * as Actions from '@shared/actions/_index';
import { AppState } from '@shared/models/_index';
import { FormsService, ApplicationsService } from '@shared/services/_index';



@Component({
    selector: 'hydro-dialog-add-source',
    templateUrl: './dialog-add-source.component.html',
    styleUrls: ['./dialog-add-source.component.scss']
})
export class DialogAddSourceComponent extends DialogBase implements OnInit {

    public sourceForm: FormGroup;
    public sourceType: string = 's3';

    constructor(
        public fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<AppState>,
        public applicationsService: ApplicationsService
    ) {
        super(
            dialogRef
        );
    }

    ngOnInit() {
        this.createForm();
        this.initFormChangesListener();
    }

    public onSubmit() {
        
    }

    private createForm() {
        // this.sourceForm = this.fb.group({
        //     signatures: this.fb.array([this.addSignature()])
        // });
    }

    private initFormChangesListener() {
        this.sourceForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

}
