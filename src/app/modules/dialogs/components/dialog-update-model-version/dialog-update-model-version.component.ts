import { Component, InjectionToken, Inject, OnDestroy } from '@angular/core';
import { isEqual } from 'lodash';

import {
  Application,
  ModelVersion,
  ModelVariant,
  Stage,
} from '@app/core/data/types';
import { Observable, Subject, of } from 'rxjs';
import { catchError, takeUntil, take, map } from 'rxjs/operators';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ApplicationBuilder } from '@app/core/data/builders';
import { DialogsService } from '../../dialogs.service';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { applicationToUpdateRequest } from '@app/core/data/utils';

export const SELECTED_MODEL_VARIANT = new InjectionToken<any>(
  'selected model variant',
);
export const LATEST_MODEL_VERSION = new InjectionToken<ModelVersion>(
  'latest model version',
);
@Component({
  templateUrl: './dialog-update-model-version.component.html',
  styleUrls: ['./dialog-update-model-version.component.scss'],
})
export class DialogUpdateModelVersionComponent implements OnDestroy {
  private destroySubscriptions: Subject<any> = new Subject<any>();
  private selectedApplication$: Observable<Application> =
    this.facade.selectedApplication();

  constructor(
    public dialog: DialogsService,
    private facade: ApplicationsFacade,
    private modelVersionsFacade: ModelVersionsFacade,
    private applicationBuilder: ApplicationBuilder,
    @Inject(SELECTED_MODEL_VARIANT) private selectedModelVariant: ModelVariant,
    @Inject(LATEST_MODEL_VERSION) private latestModelVersion: ModelVersion,
  ) {}

  onClose(): void {
    this.dialog.closeDialog();
  }

  onSubmit(): void {
    this.updateImmediatly();
    this.onClose();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.next();
    this.destroySubscriptions.complete();
  }

  get inputsEqual(): Observable<boolean> {
    return this.getModelVersionById(
      this.selectedModelVariant.modelVersionId,
    ).pipe(
      map(res => {
        const oldInputs = res.contractInputs;
        const newInputs = this.latestModelVersion.modelSignature.inputs;
        return isEqual(oldInputs, newInputs);
      }),
    );
  }

  get outputsEqual(): Observable<boolean> {
    return this.getModelVersionById(
      this.selectedModelVariant.modelVersionId,
    ).pipe(
      map(res => {
        const oldOutputs = res.contractOutputs;
        const newOutputs = this.latestModelVersion.modelSignature.outputs;
        return isEqual(oldOutputs, newOutputs);
      }),
    );
  }

  private getModelVersionById(id: number) {
    return this.modelVersionsFacade.modelVersionById(id);
  }

  private updateImmediatly(): void {
    this.selectedApplication$
      .pipe(
        map(application => {
          this.facade.editApplication(
            applicationToUpdateRequest(this.updateModelVariant(application)),
          );
        }),
        catchError(err => {
          console.error(err);
          return of(err);
        }),
        take(1),
        takeUntil(this.destroySubscriptions),
      )
      .subscribe();
  }

  private updateModelVariant(app: Application): Application {
    const stages = app.executionGraph.stages;
    const newStages: Stage[] = stages.map(stage => {
      return {
        signature: stage.signature,
        modelVariants: stage.modelVariants.map(mv => {
          if (mv == this.selectedModelVariant) {
            return {
              ...mv,
              modelVersionId: this.latestModelVersion.id,
            };
          } else {
            return mv;
          }
        }),
      };
    });

    return { ...app, executionGraph: { stages: newStages } };
  }
}
