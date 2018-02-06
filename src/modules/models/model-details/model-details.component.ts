import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {
    AppState, 
    Model
} from '@shared/models/_index';

import {
    DialogModelBuildComponent,
    injectableModelOptions,
} from '@components/dialogs/_index';

import * as Actions from '@shared/actions/_index';


@Component({
    selector: 'hydro-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit, OnDestroy {

    private activatedRouteSub: any;
    public id: string;
    public builds: any; // TODO: FIX TYPE
    // public model: any;
    public model: Model;
    public deployable = true;
    public latestVersion: string;
    public isModels = true;
    private modelVersionsListSub: Subscription;
    private modelsStoreSelectionSubscription: Subscription;
    public modelVersionsList: any[]; // TODO: FIX TYPE
    public tableHeader: string[] = [
        'Created', 'Version', 'Status', 'Actions'
    ];

    public isModelBuilded: boolean = false;


    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MdlDialogService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.activatedRouteSub = this.activatedRoute.params
            .map(params => {
                this.id = params['modelId'];
                return this.id;
            })
            .subscribe(modelId => {
                if (this.modelsStoreSelectionSubscription) {
                    this.modelsStoreSelectionSubscription.unsubscribe();
                }
                if (this.modelVersionsListSub) {
                    this.modelVersionsListSub.unsubscribe();
                }
                this.loadInitialData(modelId);
            });
    }

    loadInitialData(modelId: string) {
        // this.modelsService.getBuildsByModel(id).first()
        //     .subscribe((data) => {
        //         this.builds = data.sort((a, b) => {
        //             return moment(b.started).diff(moment(a.started));
        //         });
        //     });

        // this.store.dispatch({ type: Actions.SWITCH_MODEL, payload: modelId });

        this.store.dispatch({ type: Actions.GET_MODEL_BUILDS, payload: modelId });


        this.modelVersionsListSub = this.store.select('modelBuilds')
            .skip(1)
            .subscribe(modelVersionsList => {
                this.modelVersionsList = modelVersionsList.reverse();
                this.modelVersionsList.length ? this.isModelBuilded = true : this.isModelBuilded = false
                console.log(this.modelVersionsList);
            })

        this.modelsStoreSelectionSubscription = this.store.select('models')
            .filter(models => models.length > 0)
            .subscribe(models => {
                this.model = models.find(modelsStoreItem => modelsStoreItem.id === Number(modelId));
                console.log(this.model);
                // this.deployable = this.isDeployable();
                // this.latestVersion = this.getLatestVersion();
            });
    }

    // public isDeployable(): boolean {
    //     if (!this.model || !this.model.created) {
    //         return true;
    //     }
    //     const modelUpdated = this.model.updated;
    //     const runtimeCreated = this.model.created;
    //     return moment(modelUpdated).isAfter(moment(runtimeCreated));
    // }

    // public getPayloadForModelDeploy(runtime) {
    //     return { serviceName: `${runtime.modelName}_${runtime.modelVersion}`, modelRuntimeId: runtime.id };
    // }

  // public getLatestVersion(): string {
  //     if (this.isDeployable()) {
  //         return this.model.nextVersion;
  //     }
  //     if (!this.services || this.services.length < 1) {
  //         return '0.0.1';
  //     }
  //     const sortedRuntimes = this.services.sort((a, b) => {
  //         if (Number(a.runtime.imageTag) < Number(b.runtime.imageTag)) {
  //             return -1;
  //         }
  //         if (Number(a.runtime.imageTag) > Number(b.runtime.imageTag)) {
  //             return 1;
  //         }
  //         return 0;
  //     });
  //     return sortedRuntimes[0].imageTag;
  // }





    buildModel(model: Model) {
        this.dialog.showCustomDialog({
            component: DialogModelBuildComponent,
            styles: { 'width': '800px', 'min-height': '350px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableModelOptions, useValue: model }],
        });
    }

    public setNextModelVersion() {
        return this.isModelBuilded ? this.modelVersionsList.length + 1 : 1;
    }

    // deployModel(modelOptions) {
    //     this.dialog.showCustomDialog({
    //         component: DialogModelDeployComponent,
    //         styles: { 'width': '800px', 'min-height': '350px' },
    //         classes: '',
    //         isModal: true,
    //         clickOutsideToClose: true,
    //         enterTransitionDuration: 400,
    //         leaveTransitionDuration: 400,
    //         providers: [{ provide: injectableModelDeployOptions, useValue: modelOptions }],
    //     });
    // }

    ngOnDestroy() {
        if (this.modelsStoreSelectionSubscription) {
            this.modelsStoreSelectionSubscription.unsubscribe();
        }
        if (this.modelVersionsListSub) {
            this.modelVersionsListSub.unsubscribe();
        }
    }

}
