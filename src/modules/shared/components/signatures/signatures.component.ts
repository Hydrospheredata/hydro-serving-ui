import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MdlSnackbarService } from '@angular-mdl/core';

import { Model, Signature } from '@shared/models/_index';
import { ContractsService } from '@shared/services/_index';




@Component({
    selector: 'hydro-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit, OnDestroy, OnChanges {

    @Input() data: Model;
    public signatures: Signature[];
    public isReadOnly = true;
    public signaturesForm: FormGroup;
    private signaturesFormData;

    constructor(
        public fb: FormBuilder,
        private contractsService: ContractsService,
        private mdlSnackbarService: MdlSnackbarService,
    ) { }

    ngOnInit() { }

    ngOnChanges() {
        this.createForm();
        this.initFormChangesListener();
        this.contractsService.getModelContracts(this.data.id)
            .subscribe(data => {
                console.log(data);
                this.signatures = data.signatures;
                this.updateSignaturesFormValues(this.signatures ? this.signatures : null);
            });
    }

    ngOnDestroy() { }

    public onSubmit() {
        this.contractsService.updateModelContract(this.data.id, { signatures: this.signaturesForm.value.signatures })
            .subscribe(() => {
                this.toggleSignaturesMode();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Contract was successfully updated',
                    timeout: 5000
                });
            }, (error) => {
                this.mdlSnackbarService.showSnackbar({
                    message: `Contract update was failed with error: ${error}`,
                    timeout: 5000
                });
            });
    }

    public cancelEdit() {
        this.signaturesForm.reset(this.signaturesFormData);
        this.toggleSignaturesMode();
    }

    public initFormChangesListener() {
        this.signaturesForm.valueChanges
            .subscribe(form => {
                console.log(form);
            });
    }

    public toggleSignaturesMode() {
        this.isReadOnly = !this.isReadOnly;
    }

    public addSignatureControl(event?) {
        const control = <FormArray>this.signaturesForm.get('signatures');
        control.push(this.addSignature(event));
    }

    public removeSignatureControl(i: number) {
        const control = <FormArray>this.signaturesForm.get('signatures');
        control.removeAt(i);
    }

    private createForm() {
        this.signaturesForm = this.fb.group({
            signatures: this.fb.array([])
        });
    }

    private addSignature(event?) {
        return this.fb.group({
            signatureName: [''],
            inputs: this.fb.array(event ? [this.addSignatureField()] : []),
            outputs: this.fb.array(event ? [this.addSignatureField()] : []),
        });
    }

    private addSignatureField() {
        return this.fb.group({
            fieldName: ['/'],
            dataType: [''],
            shape: [[]]
        });
    }

    private updateSignaturesFormValues(signatures: Signature[]) {
        signatures.forEach((signature, i) => {
            this.addSignatureControl();
            const inputs = <FormArray>this.signaturesForm.get(['signatures', i]).get('inputs');
            const outputs = <FormArray>this.signaturesForm.get(['signatures', i]).get('outputs');
            signature.inputs.forEach(() => {
                inputs.push(this.addSignatureField());
            });
            signature.outputs.forEach(() => {
                outputs.push(this.addSignatureField());
            });
        });

        this.signaturesFormData = {
            signatures: signatures
        };

        this.signaturesForm.patchValue(this.signaturesFormData);
    }

}
