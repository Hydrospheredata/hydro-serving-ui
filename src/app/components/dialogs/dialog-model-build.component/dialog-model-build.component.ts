import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelsService } from '@shared/services/_index';
import { DialogBase } from '@shared/base/_index';

// import { ModelBuilder } from '@shared/builders/_index';

import { Store } from '@ngrx/store';
import { AppState, Model } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import 'rxjs/add/operator/mergeMap';

import { Subscription } from 'rxjs/Subscription';

export let injectableModelOptions = new InjectionToken<object>('injectableModelOptions');



@Component({
    selector: 'hydro-dialog-model-build',
    templateUrl: './dialog-model-build.component.html',
    styleUrls: ['./dialog-model-build.component.scss'],
    providers: [MdlSnackbarService, FormBuilder]
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
        // private runtimeTypesService: RuntimeTypesService,
        @Inject(injectableModelOptions) data,
        private store: Store<AppState>,
        private modelsService: ModelsService,
        // private modelBuilder: ModelBuilder,
    ) {
        super(
            dialogRef
        );
        this.model = data;
    }

    ngOnInit() {
        this.createBuildModelForm();
        // this.runtimeTypesService.getRuntimeTypeByModelType(this.model.model.modelType)
        //     .subscribe((runtimeTypes: RuntimeType[]) => {
        //         this.runtimeTypes = runtimeTypes;
        //     });
        // this.runtimeTypesSub = this.runtimeTypesService.getAll()
        //     .subscribe((runtimeTypes: RuntimeType[]) => {
        //         this.runtimeTypes = runtimeTypes;
        //     });
    }

    ngOnDestroy() {
        if (this.runtimeTypesSub) {
            this.runtimeTypesSub.unsubscribe();
        }
    }

    private createBuildModelForm() {
        this.buildModelForm = this.fb.group({
            modelId: [this.model.id],
            // runtimeType: [this.runtimeTypes, [Validators.required]]
        });
    }

    onSubmit() {
        // const controls = this.buildModelForm.controls;
        const modelOptions = {
            modelId: this.model.id,
            // runtimeTypeId: Number(controls.runtimeType.value)
        };

        this.modelsService.buildModel(modelOptions)
            .subscribe(response => {
                console.log('build model: ', response);
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                    message: 'Model was successfully builded',
                    timeout: 5000
                });
                this.store.dispatch({ type: Actions.UPDATE_MODEL, payload: new Model(response) });
                this.store.dispatch({ type: Actions.GET_MODEL_BUILDS, payload: response.model.id });
                // this.store.dispatch({ type: Actions.UPDATE_MODEL, payload: this.modelBuilder.build(response.json()) });
                // this.store({type: HydroActions.UPDATE_MODEL, payload: this.modelBuilder.build(data)})
                // this.store.dispatch({ type: Actions.SWITCH_MODEL, payload: modelOptions.modelId });
            }, (error) => {
                this.mdlSnackbarService.showSnackbar({
                    message: `Error: ${error}`,
                    timeout: 5000
                });
            });
    }
}
