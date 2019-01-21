
import { Component, InjectionToken, Inject, OnDestroy } from '@angular/core';

import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { Application, Stage } from '@shared/models/_index';
import { Observable ,  Subject,  of } from 'rxjs';
import { tap ,  catchError, takeUntil, take, map } from 'rxjs/operators';

import { UpdateApplicationAction } from '@applications/actions';
import { ApplicationsBuilderService, IModelVariantFormData } from '@applications/services';
import { DialogService } from '@dialog/dialog.service';

export const SELECTED_MODEL_VARIANT = new InjectionToken<any>('selected model variant');
export const LATEST_MODEL_VERSION_ID = new InjectionToken<number>('latest model version id');
@Component({
    templateUrl: './dialog-update-model-version.component.html',
    styleUrls: ['./dialog-update-model-version.component.scss'],
})
export class DialogUpdateModelVersionComponent implements OnDestroy {
    private destroySubscriptions: Subject<any> = new Subject<any>();
    private selectedApplication$: Observable<Application>;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>,
        private applicationBuilder: ApplicationsBuilderService,
        @Inject(SELECTED_MODEL_VARIANT) private selectedModelVariant: any,
        @Inject(LATEST_MODEL_VERSION_ID) private latestModelVersionId: number
    ) {
        this.selectedApplication$ = this.store.select(fromApplications.getSelectedApplication);
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
        this.selectedApplication$.pipe(
            map(application => {
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
                    modelVariants: this.reduceModelVariantsData(stage.modelVariants),
                },
            ];
        }, []);
    }

    private reduceModelVariantsData(modelVariants): IModelVariantFormData[] {
        return modelVariants.reduce((newModelVarianats, modelVariant) =>
            [...newModelVarianats, this.createNewModelVariantData(modelVariant)], []
        );
    }

    private createNewModelVariantData(modelVariant): IModelVariantFormData {
        const newModelVariant: IModelVariantFormData = {
            modelVersionId: modelVariant.modelVersion.id,
            weight: Number(modelVariant.weight),
            signatureName: modelVariant.signature.signatureName,
        };

        if (modelVariant === this.selectedModelVariant) {
            newModelVariant.modelVersionId = this.latestModelVersionId;
        }

        return newModelVariant;
    }
}
