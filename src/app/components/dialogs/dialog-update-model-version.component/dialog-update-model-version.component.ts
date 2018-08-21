import { Component,InjectionToken,Inject } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { DialogBase } from '@shared/base/_index';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';

import * as fromApplications from '@applications/reducers';
import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs/Observable';
import { Application, Model } from '@shared/models/_index';

import * as hocon from 'hocon-parser';

import { UpdateApplicationAction } from '@applications/actions';

export const CHANGE_IDS = new InjectionToken<object>('stage and serv ids');

@Component({
    selector: 'hydro-dialog-update-model-version',
    templateUrl: './dialog-update-model-version.component.html',
    styleUrls: ['./dialog-update-model-version.component.scss']
})
export class DialogUpdateModelVersionComponent extends DialogBase {
    public application$: Observable<Application>;
    public models: Model[];

    public changeIds;

    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>,
        @Inject(CHANGE_IDS) changeIds: number[]
    ) {
        super(
            dialogRef
        );
        this.changeIds = changeIds;
        this.application$ = this.store.select(fromApplications.getSelectedApplication);

        this.store.select(fromModels.getAllModels)
            .filter(models => models.length > 0)
            .subscribe(models => this.models = models)
    }

    public updateImmediatly() {
        let serviceInfo = {};
        const stages = [];

        let {stageId, serviceId} = this.changeIds;

        this.application$.take(1).subscribe(application => {
            const _ = application;
            _.executionGraph.stages.forEach((stage, idxStage) => {
                const services = [];
                stage.services.forEach((service, idxService) => {
                    const newService = {
                        runtimeId: service.runtime.id,
                        modelVersionId: service.modelVersion.id,
                        weight: Number(service.weight),
                        signatureName: service.signature ? hocon(service.signature).signature_name : ''
                    };

                    if(stageId === idxStage && serviceId === idxService){
                        const { modelName } = service.modelVersion;
                        const modell = this.models.find(model => model.name === modelName);
                        newService.modelVersionId = modell.lastModelBuild.id
                    }

                    services.push(newService)

                });
                stages.push({ services: services });
            });
            serviceInfo = {
                id: _.id,
                name: _.name,
                kafkaStreaming: _.kafkaStreaming,
                executionGraph: {
                    stages: stages
                }
            }
        });

        this.store.dispatch(new UpdateApplicationAction(new Application(serviceInfo)));
    }

    public submit() {
        this.updateImmediatly();
        this.dialogRef.hide();
    }
}
