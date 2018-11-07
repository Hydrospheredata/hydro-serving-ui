import { Component,InjectionToken,Inject, OnDestroy } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { DialogBase } from '@shared/base/_index';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';

import * as fromApplications from '@applications/reducers';
import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs/Observable';
import { Application, Model, Stage } from '@shared/models/_index';

import * as hocon from 'hocon-parser';

import { UpdateApplicationAction } from '@applications/actions';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { catchError, takeUntil, take, map } from 'rxjs/operators';
import { ApplicationsBuilderService } from '@applications/services';

export interface ServiceData {
    runtimeId: number;
    modelVersionId: number;
    weight: number;
    signatureName: string;
}

export const SELECTED_SERVICE = new InjectionToken<any>('selected service');
@Component({
    selector: 'hydro-dialog-update-model-version',
    templateUrl: './dialog-update-model-version.component.html',
    styleUrls: ['./dialog-update-model-version.component.scss']
})
export class DialogUpdateModelVersionComponent extends DialogBase implements OnDestroy {
    private allModels$: Observable<Model[]>;
    private destroySubscriptions: Subject<any> = new Subject<any>();   
    private selectedApplication$: Observable<Application>;
    private models;
    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>,
        private applicationBuilder: ApplicationsBuilderService,
        @Inject(SELECTED_SERVICE) private selectedService: any
    ) {
        super(dialogRef);

        this.selectedApplication$ = this.store.select(fromApplications.getSelectedApplication);
        this.allModels$ = this.store.select(fromModels.getAllModels)
                                    .filter(models => models.length > 0)
    }

    private updateImmediatly(): void {
        combineLatest(this.selectedApplication$, this.allModels$).pipe(
            map(([application, models]) => {
                this.models = models;

                const stages = this.reduceStages(application.executionGraph.stages);
    
                return { ...application, executionGraph: { stages }};
            }),
            tap(newApplicationData => {
                let app = this.applicationBuilder.build(newApplicationData);
                this.store.dispatch(new UpdateApplicationAction(app));
            }),
            catchError(err => {
                console.error(err);
                return of(err);
            }),
            take(1),
            takeUntil(this.destroySubscriptions)
        ).subscribe();        
    }

    private reduceStages(stages: Stage[]): Stage[] {
        return stages.reduce((stages, stage) => {
            return [
                ...stages, 
                { 
                    services: this.reduceServicesData(stage.services)
                }
            ];
        }, []);
    }

    private reduceServicesData(services): ServiceData[] {
        return services.reduce((services, service) => {
            return [...services, this.createNewSeviceData(service)]
        }, [])
    }

    private createNewSeviceData(service): ServiceData {
        const newService: ServiceData = {
            runtimeId: service.runtime.id,
            modelVersionId: service.modelVersion.id,
            weight: Number(service.weight),
            signatureName: service.signature ? hocon(service.signature).signature_name : ''
        };

        if(service === this.selectedService){
            const { modelName } = service.modelVersion;
            const modell = this.models.find(model => model.name === modelName);
            newService.modelVersionId = modell.lastModelVersion.id;
        }

        return newService;
    }

    public submit() {
        this.updateImmediatly();
        this.dialogRef.hide();
    }

    ngOnDestroy(): void {
        this.destroySubscriptions.next();
        this.destroySubscriptions.complete();
    }
}
