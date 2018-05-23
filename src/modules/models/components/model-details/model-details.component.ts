import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Model, ModelBuild, Signature } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';

import {
    DialogModelBuildComponent,
    injectableModelOptions
} from '@components/dialogs/_index';

import * as Actions from '@shared/actions/_index';
import { GetModelBuildsAction } from '@models/actions';
import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'hydro-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit, OnDestroy {
    public model: Model;
    public model$: Observable<Model>;
    public modelBuilds$: Observable<ModelBuild[]>;
    public signatures: Signature[];
    public modelBuilds: ModelBuild[];
    public tableHeader: string[] = ['Version', 'Created', 'Status', 'Applications', ''];
    private modelBuildsSub: Subscription;
    private modelsStoreSelectionSubscription: Subscription;
    private activatedRouteSubscription: Subscription;


    constructor(
        private activatedRoute: ActivatedRoute,
        private dialog: MdlDialogService,
        private store: Store<HydroServingState>,
    ) {
        this.model$ = this.store.select(fromModels.getSelectedModel);
        this.modelBuilds$ = this.store.select(fromModels.getAllModelBuilds);
    }

    public ngOnInit() {
        this.activatedRouteSubscription = this.activatedRoute.params
            .map(params => {
                return params['modelId'];
            })
            .subscribe(modelId => {
                if (this.modelsStoreSelectionSubscription) {
                    this.modelsStoreSelectionSubscription.unsubscribe();
                }
                if (this.modelBuildsSub) {
                    this.modelBuildsSub.unsubscribe();
                }
                this.loadInitialData(Number(modelId));
            });
    }

    public ngOnDestroy() {
        if (this.activatedRouteSubscription) {
            this.activatedRouteSubscription.unsubscribe();
        }
        if (this.modelsStoreSelectionSubscription) {
            this.modelsStoreSelectionSubscription.unsubscribe();
        }
        if (this.modelBuildsSub) {
            this.modelBuildsSub.unsubscribe();
        }
    }

    private loadInitialData(modelId: number) {
        this.store.dispatch(new GetModelBuildsAction(modelId));
        this.store.dispatch(new Actions.GetSignaturesAction({ type: 'model', id: modelId }));

        // this.model$ = this.store.select(fromModels.getSelectedModel);
        // .subscribe(modelBuilds => {
        //     this.modelBuilds = modelBuilds.reverse();
        // });

        // this.store.select(fromModels.getModelEntitiesState)
        // .filter(models => models.length > 0)
        // .subscribe(models => {
        //     this.model = models.find(modelsStoreItem => modelsStoreItem.id === modelId);
        // });
    }

    public buildModel(model: Model) {
        this.dialog.showCustomDialog({
            component: DialogModelBuildComponent,
            styles: { 'width': '850px', 'min-height': '350px', 'max-height': '100vh', 'overflow-y': 'scroll' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableModelOptions, useValue: model }],
        });
    }

}
