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

    public model: Model;
    public modelVersionsList: any[]; // TODO: FIX TYPE
    public isModelBuilded: boolean = false;
    public tableHeader: string[] = [
        'Created', 'Version', 'Status', 'Actions'
    ];
    
    private modelVersionsListSub: Subscription;
    private modelsStoreSelectionSubscription: Subscription;
    private activatedRouteSubscription: Subscription;


    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MdlDialogService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.activatedRouteSubscription = this.activatedRoute.params
            .map(params => {
                const id = params['modelId'];
                return id;
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

    private loadInitialData(modelId: string) {
        this.store.dispatch({ type: Actions.GET_MODEL_BUILDS, payload: modelId });

        this.modelVersionsListSub = this.store.select('modelBuilds')
            .skip(1)
            .subscribe(modelVersionsList => {
                this.modelVersionsList = modelVersionsList.reverse();
                this.modelVersionsList.length ? this.isModelBuilded = true : this.isModelBuilded = false
            })

        this.modelsStoreSelectionSubscription = this.store.select('models')
            .filter(models => models.length > 0)
            .subscribe(models => {
                this.model = models.find(modelsStoreItem => modelsStoreItem.id === Number(modelId));
            });
    }

    public buildModel(model: Model) {
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
