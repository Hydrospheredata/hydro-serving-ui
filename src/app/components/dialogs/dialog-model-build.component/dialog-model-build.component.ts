import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelsService } from '@shared/services/_index';
import { DialogBase } from '@shared/base/_index';

import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import 'rxjs/add/operator/mergeMap';

import { Subscription } from 'rxjs/Subscription';

export let injectableModelOptions = new InjectionToken<object>('injectableModelOptions');



@Component({
    selector: 'hydro-dialog-model-build',
    templateUrl: './dialog-model-build.component.html',
    styleUrls: ['./dialog-model-build.component.scss']
})
export class DialogModelBuildComponent extends DialogBase implements OnInit {
    public buildModelForm: FormGroup;
    public currentModelRuntimeType;
    public runtimeTypes;
    public data;
    public model;
    public modelType: string;
    private runtimeTypesSub: Subscription;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MdlDialogReference,
        private mdlSnackbarService: MdlSnackbarService,
        @Inject(injectableModelOptions) data,
        private store: Store<AppState>,
        private modelsService: ModelsService
    ) {
        super(
            dialogRef
        );
        this.model = data;
    }

    ngOnInit() {
        this.createBuildModelForm();
    }

    ngOnDestroy() {
        if (this.runtimeTypesSub) {
            this.runtimeTypesSub.unsubscribe();
        }
    }

    private createBuildModelForm() {
        this.buildModelForm = this.fb.group({
            modelId: [this.model.id]
        });
    }

    onSubmit() {
        const modelOptions = {
            modelId: this.model.id
        };

        this.modelsService.buildModel(modelOptions)
            .subscribe(response => {
                this.store.dispatch({ type: Actions.UPDATE_MODEL, payload: response });
                // this.store.dispatch({ type: Actions.UPDATE_ALL_VERSIONS, payload: response });
                this.store.dispatch({ type: Actions.GET_MODEL_BUILDS, payload: response.model.id });

                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Model was successfully released',
                    timeout: 5000
                });
            }, (error) => {
                this.mdlSnackbarService.showSnackbar({
                    message: `Error: ${error}`,
                    timeout: 5000
                });
            });
    }
}
