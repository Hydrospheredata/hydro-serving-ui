import { Component, InjectionToken, Inject, OnDestroy } from '@angular/core';
import { IModelVariantFormData } from '@app/modules/applications/components/forms/model-variant-form/model-variant-form.service';
import { isEqual } from 'lodash';

import {
  Application,
  Stage,
  ModelVersion,
  IModelVariant,
} from '@app/core/data/types';
import { Observable, Subject, of } from 'rxjs';
import { tap, catchError, takeUntil, take, map } from 'rxjs/operators';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ApplicationBuilder } from '@app/core/data/builders';
import { DialogsService } from '../../dialogs.service';

export const SELECTED_MODEL_VARIANT = new InjectionToken<any>(
  'selected model variant'
);
export const LATEST_MODEL_VERSION = new InjectionToken<ModelVersion>(
  'latest model version'
);
@Component({
  templateUrl: './dialog-update-model-version.component.html',
  styleUrls: ['./dialog-update-model-version.component.scss'],
})
export class DialogUpdateModelVersionComponent implements OnDestroy {
  private destroySubscriptions: Subject<any> = new Subject<any>();
  private selectedApplication$: Observable<
    Application
  > = this.facade.selectedApplication();

  constructor(
    public dialog: DialogsService,
    private facade: ApplicationsFacade,
    private applicationBuilder: ApplicationBuilder,
    @Inject(SELECTED_MODEL_VARIANT) private selectedModelVariant: IModelVariant,
    @Inject(LATEST_MODEL_VERSION) private latestModelVersion: ModelVersion
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

  get inputsEqual(): boolean {
    const oldInputs = this.selectedModelVariant.modelVersion.contractInputs;
    const newInputs = this.latestModelVersion.modelSignature.inputs;
    return isEqual(oldInputs, newInputs);
  }

  get outputsEqual(): boolean {
    const oldOutputs = this.selectedModelVariant.modelVersion.contractOutputs;
    const newOutputs = this.latestModelVersion.modelSignature.outputs;
    return isEqual(oldOutputs, newOutputs);
  }

  private updateImmediatly(): void {
    this.selectedApplication$
      .pipe(
        map(application => {
          const stages = this.reduceStages(application.executionGraph.stages);
          return { ...application, executionGraph: { stages } };
        }),
        tap(newApplicationData => {
          const application = this.applicationBuilder.build(newApplicationData);
          this.facade.editApplication(application);
        }),
        catchError(err => {
          console.error(err);
          return of(err);
        }),
        take(1),
        takeUntil(this.destroySubscriptions)
      )
      .subscribe();
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
    return modelVariants.reduce(
      (newModelVarianats, modelVariant) => [
        ...newModelVarianats,
        this.createNewModelVariantData(modelVariant),
      ],
      []
    );
  }

  private createNewModelVariantData(modelVariant): IModelVariantFormData {
    const newModelVariant: IModelVariantFormData = {
      modelVersionId: modelVariant.modelVersion.id,
      weight: Number(modelVariant.weight),
      deploymentConfigName: modelVariant.deploymentConfigName,
    };

    if (modelVariant === this.selectedModelVariant) {
      newModelVariant.modelVersionId = this.latestModelVersion.id;
    }

    return newModelVariant;
  }
}
