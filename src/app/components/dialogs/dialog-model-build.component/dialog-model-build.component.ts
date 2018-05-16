import { Component, OnInit, InjectionToken, Inject, OnDestroy } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { HydroServingState, Signature } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';

export let injectableModelOptions = new InjectionToken<object>('injectableModelOptions');



@Component({
    selector: 'hydro-dialog-model-build',
    templateUrl: './dialog-model-build.component.html',
    styleUrls: ['./dialog-model-build.component.scss']
})
export class DialogModelBuildComponent extends DialogBase implements OnInit, OnDestroy {
    public currentModelRuntimeType;
    public runtimeTypes;
    public data;
    public model;
    public modelType: string;

    public signatures: Signature[];
    public isContractViewEnabled = false;

    private runtimeTypesSub: Subscription;

    constructor(
        public dialogRef: MdlDialogReference,
        @Inject(injectableModelOptions) data,
        private store: Store<HydroServingState>,
    ) {
        super(
            dialogRef
        );
        this.model = data;
    }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.runtimeTypesSub) {
            this.runtimeTypesSub.unsubscribe();
        }
    }

    public onSubmit() {
        const modelOptions = {
            modelId: this.model.id
        };

        this.buildModel(modelOptions);
    }

    private buildModel(modelOptions) {
        this.store.dispatch(new Actions.BuildModelAction(modelOptions));
        this.dialogRef.hide();
    }
}
