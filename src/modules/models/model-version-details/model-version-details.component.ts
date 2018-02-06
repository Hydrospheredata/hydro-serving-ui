import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { MdlDialogService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {
    AppState, 
    // Model
} from '@shared/_index';

// import {
//     DialogModelBuildComponent,
//     DialogTestComponent,
//     DialogStopModelComponent,
//     injectableModelOptions,
//     injectableModelDeployOptions,
//     injectableModelStopOptions,
//     injectableModelBuildOptions
// } from '@components/dialogs/_index';

// import * as Actions from '@shared/actions/_index';


@Component({
    selector: 'hydro-model-version-details',
    templateUrl: './model-version-details.component.html',
    styleUrls: ['./model-version-details.component.scss']
})
export class ModelVersionDetailsComponent implements OnInit, OnDestroy {

    private activatedRouteSub: any;
    public id: string;
    public builds: any; // TODO: FIX TYPE
    public model: any;
    public deployable = true;
    public latestVersion: string;
    public isModels = true;
    private modelsBuildsSubscribtion: Subscription;
    private modelsStoreSelectionSubscription: Subscription;
    public nestedModelRuntimes: any[]; // TODO: FIX TYPE
    public tableHeader: string[] = [
        'Field name', 'Data type', 'Shape'
    ];


    constructor(
        private activatedRoute: ActivatedRoute,
        // private dialog: MdlDialogService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.activatedRouteSub = this.activatedRoute.params
            .map((params) => {
                const modelVersionId = params['modelVersionId'];
                
                return modelVersionId;
            })
            .subscribe((modelVersionId) => {
                console.log(modelVersionId);
                if (this.modelsStoreSelectionSubscription) {
                    this.modelsStoreSelectionSubscription.unsubscribe();
                }
                this.loadInitialData(modelVersionId);
            });
    }

    public signatures: any;

    loadInitialData(id: string) {
        this.modelsBuildsSubscribtion = this.store.select('modelBuilds')
            .subscribe(services => {
                this.model = services.find(dataStoreItem => dataStoreItem.id === Number(id));
                // this.signatures = JSON.parse(JSON.stringify(this.model.modelVersion.modelContract));
                console.log(typeof JSON.parse(JSON.stringify(`{${this.model.modelVersion.modelContract}}`)));
                // console.log(JSON.parse(`{${this.model.modelVersion.modelContract}}`));
            });
    }

  // buildModel(modelOptions: Model) {
  //     this.dialog.showCustomDialog({
  //         component: DialogModelBuildComponent,
  //         styles: { 'width': '800px', 'min-height': '350px' },
  //         classes: '',
  //         isModal: true,
  //         clickOutsideToClose: true,
  //         enterTransitionDuration: 400,
  //         leaveTransitionDuration: 400,
  //         providers: [{ provide: injectableModelOptions, useValue: modelOptions }],
  //     });
  // }

    ngOnDestroy() {
        if (this.modelsStoreSelectionSubscription) {
            this.modelsStoreSelectionSubscription.unsubscribe();
        }
        if (this.modelsBuildsSubscribtion) {
            this.modelsBuildsSubscribtion.unsubscribe();
        }
    }

}
