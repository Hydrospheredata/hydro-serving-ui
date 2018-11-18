
import { MdlSnackbarService } from '@angular-mdl/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {filter} from 'rxjs/operators';

import { GetModelVersionSignaturesAction } from '@core/actions';
import { HydroServingState } from '@core/reducers';
import { SignaturesService } from '@core/services';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';
import { Signature, ModelBuild } from '@shared/models/_index';
// import * as Actions from '@core/actions';
import { Subscription ,  Observable } from 'rxjs';

@Component({
    selector: 'hydro-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.scss'],
})
export class SignaturesComponent implements OnInit, OnDestroy {

    @Input() modelId: number;
    @Input() isEditable: boolean;
    public signatures: Signature[];
    public isReadOnly = true;
    public signaturesForm: FormGroup;
    private signaturesSub: Subscription;
    private buildSub: Subscription;
    private build$: Observable<ModelBuild>;

    constructor(
        public fb: FormBuilder,
        private signaturesService: SignaturesService,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<HydroServingState>
    ) {
        this.build$ = this.store.select(fromModels.getSelectedBuild);
    }

    ngOnInit() {
        this.buildSub = this.build$.pipe(filter(_ => _ != null)).subscribe(build => {
            this.store.dispatch(new GetModelVersionSignaturesAction(build.modelVersion.id));
        });
        console.log('init signatures');
        this.createForm();
        this.signaturesSub = this.store.select('signatures')
            .subscribe(signatures => {
                this.signatures = signatures;
                this.resetForm();
                this.updateSignaturesFormValues(this.signatures);
            });
    }

    ngOnDestroy() {
        if (this.signaturesSub) {
            this.signaturesSub.unsubscribe();
        }

        if (this.buildSub) {
            this.buildSub.unsubscribe();
        }
    }

    public onSubmit() {
        this.signaturesForm.value.signatures.forEach(signature => {
            signature.inputs.forEach(input => {
                if (typeof input.shape === 'string') { // ToDo: Fix condition
                    input.shape = input.shape.split(/[ ,.]+/).map(Number);
                }
            });
            signature.outputs.forEach(output => {
                if (typeof output.shape === 'string') { // ToDo: Fix condition
                    output.shape = output.shape.split(/[ ,.]+/);
                }
            });
        });
        this.signaturesService.updateModelSignatures(this.modelId, { signatures: this.signaturesForm.value.signatures })
            .subscribe(() => {
                this.toggleSignaturesMode();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Contract was successfully updated',
                    timeout: 5000,
                });
            }, error => {
                this.mdlSnackbarService.showSnackbar({
                    message: `Contract update was failed with error: ${error}`,
                    timeout: 5000,
                });
            });
    }

    public addSignatureFields(signatureIndex: number, fieldType: string) {
        const control = this.signaturesForm.get(['signatures', signatureIndex]).get(fieldType) as FormArray;
        control.push(this.addSignatureValues());
    }

    public removeSignatureFields(signatureIndex: number, fieldIndex: number, fieldType: string) {
        const control = this.signaturesForm.get(['signatures', signatureIndex]).get(fieldType) as FormArray;
        control.removeAt(fieldIndex);
    }

    public cancelEdit() {
        this.resetForm();
        this.updateSignaturesFormValues(this.signatures);
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
        const control = this.signaturesForm.get('signatures') as FormArray;
        control.push(this.addSignature(event));
    }

    public removeSignatureControl(i: number) {
        const control = this.signaturesForm.get('signatures') as FormArray;
        control.removeAt(i);
    }

    private createForm() {
        this.signaturesForm = this.fb.group({
            signatures: this.fb.array([]),
        });
    }

    private addSignature(event?): FormGroup {
        return this.fb.group({
            signatureName: ['', Validators.required],
            inputs: this.fb.array(event ? [this.addSignatureValues()] : []),
            outputs: this.fb.array(event ? [this.addSignatureValues()] : []),
        });
    }

    private addSignatureValues(): FormGroup {
        return this.fb.group({
            fieldName: ['', Validators.required],
            dataType: ['', Validators.required],
            shape: [''],
        });
    }

    private resetForm() {
        this.createForm();
    }

    private updateSignaturesFormValues(signatures: Signature[]) {
        signatures.forEach((signature, i) => {
            this.addSignatureControl();
            const inputs = this.signaturesForm.get(['signatures', i]).get('inputs') as FormArray;
            const outputs = this.signaturesForm.get(['signatures', i]).get('outputs') as FormArray;
            signature.inputs.forEach(() => {
                inputs.push(this.addSignatureValues());
            });
            signature.outputs.forEach(() => {
                outputs.push(this.addSignatureValues());
            });
        });
        this.signaturesForm.patchValue({ signatures });
    }

}
