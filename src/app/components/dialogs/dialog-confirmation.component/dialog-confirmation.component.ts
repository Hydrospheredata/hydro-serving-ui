import { Component } from '@angular/core';
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



@Component({
    selector: 'hydro-dialog-confirmation',
    templateUrl: './dialog-confirmation.component.html',
    styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent extends DialogBase {

    public application$: Observable<Application>;
    public models: Model[];


    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        this.store.select(fromModels.getAllModels)
            .filter(models => models.length > 0)
            .subscribe(models => this.models = models)
    }

    public updateImmediatly() {
        let serviceInfo = {};
        const stages = [];
        this.application$.take(1).subscribe(application => {
            const _ = application;
            _.executionGraph.stages.forEach(stage => {
                const services = [];
                stage.services.forEach(service => {
                    const {modelName, modelVersion} = service.modelVersion;
                    const modell = this.models.find(model => model.name === modelName);
                    services.push(
                        {
                            runtimeId: service.runtime.id,
                            modelVersionId: modell.lastModelBuild.version > modelVersion ? modell.lastModelBuild.id : service.modelVersion.id,
                            weight: Number(service.weight),
                            signatureName: service.signature ? hocon(service.signature).signature_name : ''
                        }
                    );
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
