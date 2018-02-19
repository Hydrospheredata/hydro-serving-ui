import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';


import { Signature } from '@shared/models/_index';

import { ContractsService } from '@shared/services/_index';

import { DialogBase } from '@shared/base/_index';


export let injectableModelId = new InjectionToken<object>('injectableModelId');

@Component({
    selector: 'hydro-dialog-edit-contract',
    templateUrl: './dialog-edit-contract.component.html',
    styleUrls: ['./dialog-edit-contract.component.scss']
})
export class DialogEditContractComponent extends DialogBase implements OnInit {
    public injectableModelId;
    public signatures: Signature[];
    public contractsForm: FormGroup;
    public inputOptions = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: false,
        scrollbarStyle: 'null'
    };
    public outputOptions = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: false,
        scrollbarStyle: 'null'
    };

    constructor( 
        @Inject(injectableModelId) injectableModelId,
        public dialogRef: MdlDialogReference,
        private fb: FormBuilder,
        private contractsService: ContractsService,
        private mdlSnackbarService: MdlSnackbarService
    ) {
        super(
            dialogRef
        );
        this.injectableModelId = injectableModelId;
    }


    ngOnInit() {
        this.createForm();
        // this.initFormChangesListener();
        this.contractsService.getModelContracts(this.injectableModelId)
            .subscribe(data => {
                console.log(data.signatures);
                this.signatures = data.signatures;
                this.updateContractsFormValues(this.signatures ? this.signatures : null);
            });
    }

    public onSubmit() {
        this.contractsService.updateModelContract(this.injectableModelId, { signatures: this.contractsForm.value.signatures })
            .subscribe(() => {
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Contracts was successfully updated',
                    timeout: 5000
                });
            });
    }

    public addSignatureToContract() {
        const control = <FormArray>this.contractsForm.controls['signatures'];
        control.push(this.addSignature());
    }

    public removeSignatureFromContract(index: number) {
        const control = <FormArray>this.contractsForm.controls['signatures'];
        control.removeAt(index);
    }

    private updateContractsFormValues(signatures: Signature[]) {
        for (let i = 0; i < signatures.length - 1; i++) {
            this.addSignatureToContract();
        }
        
        this.contractsForm.patchValue({
            signatures: signatures
        });
    }

    // private initFormChangesListener() {
    //     this.contractsForm.valueChanges
    //         .subscribe(form => {
    //             console.log(form);
    //         });
    // }

    private createForm() {
        this.contractsForm = this.fb.group({
            signatures: this.fb.array([this.addSignature()])
        });
    }

    private addSignature() {
        return this.fb.group({
            signatureName: [ '', Validators.required ],
            inputs: this.fb.array([this.addSignatureField()]),
            outputs: this.fb.array([this.addSignatureField()]),
        });
    }

    private addSignatureField() {
        return this.fb.group({
            fieldName: [ '/', Validators.required ], 
            dataType: [ '', Validators.required ], 
            shape: [ '', Validators.required ]
        });
    }
}
