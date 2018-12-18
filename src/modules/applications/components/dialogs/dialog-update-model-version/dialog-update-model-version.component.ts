
import { Component, InjectionToken, Inject, OnDestroy } from '@angular/core';

import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';

import { Application, Model, Stage } from '@shared/models/_index';
import * as hocon from 'hocon-parser';
import { Observable ,  Subject ,  combineLatest ,  of } from 'rxjs';
import { filter,  tap ,  catchError, takeUntil, take, map } from 'rxjs/operators';

import { UpdateApplicationAction } from '@applications/actions';
import { ApplicationsBuilderService } from '@applications/services';
import { DialogService } from '@dialog/dialog.service';

export interface IServiceData {
    runtimeId: number;
    modelVersionId: number;
    weight: number;
    signatureName: string;
}

export const SELECTED_SERVICE = new InjectionToken<any>('selected service');
@Component({
    templateUrl: './dialog-update-model-version.component.html',
    styleUrls: ['./dialog-update-model-version.component.scss'],
})
export class DialogUpdateModelVersionComponent implements OnDestroy {
    private allModels$: Observable<Model[]>;
    private destroySubscriptions: Subject<any> = new Subject<any>();
    private selectedApplication$: Observable<Application>;
    private models;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>,
        private applicationBuilder: ApplicationsBuilderService,
        @Inject(SELECTED_SERVICE) private selectedService: any
    ) {
        this.selectedApplication$ = this.store.select(fromApplications.getSelectedApplication);
        this.allModels$ = this.store.select(fromModels.getAllModels).pipe(
                                    filter(models => models.length > 0));
    }

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onSubmit(): void {
        this.updateImmediatly();
        this.onClose();
    }

    ngOnDestroy(): void {
        this.destroySubscriptions.next();
        this.destroySubscriptions.complete();
    }

    private updateImmediatly(): void {
        combineLatest(this.selectedApplication$, this.allModels$).pipe(
            map(([application, models]) => {
                this.models = models;

                const stages = this.reduceStages(application.executionGraph.stages);

                return { ...application, executionGraph: { stages }};
            }),
            tap(newApplicationData => {
                const app = this.applicationBuilder.build(newApplicationData);
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
        return stages.reduce((newStages, stage) => {
            return [
                ...newStages,
                {
                    services: this.reduceServicesData(stage.services),
                },
            ];
        }, []);
    }

    private reduceServicesData(services): IServiceData[] {
        return services.reduce((newServices, service) =>
            [...newServices, this.createNewSeviceData(service)], []
        );
    }

    private createNewSeviceData(service): IServiceData {
        const newService: IServiceData = {
            runtimeId: service.runtime.id,
            modelVersionId: service.modelVersion.id,
            weight: Number(service.weight),
            signatureName: service.signature ? hocon(service.signature).signature_name : '',
        };

        if (service === this.selectedService) {
            const { modelName } = service.modelVersion;
            const modell = this.models.find(model => model.name === modelName);
            newService.modelVersionId = modell.lastModelVersion.id;
        }

        return newService;
    }

}
