import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HydroServingState } from '@core/reducers';
import { TimemachineService } from '@core/services/timemachine.service';
import { DialogService } from '@dialog/dialog.service';
import {
  getModelsWithAtleastTwoModelVersions,
  getModelVersionsByModelId,
} from '@models/reducers';
import { Store } from '@ngrx/store';
import { ModelVersion, Model } from '@shared/_index';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'hs-dialog-add-reply',
  templateUrl: './dialog-add-reply.component.html',
  styleUrls: ['./dialog-add-reply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddReplyComponent implements OnInit {
  models$: Observable<Model[]>;
  modelVersions$: Observable<ModelVersion[]> = of([]);
  secondModelVersions$: Observable<ModelVersion[]> = of([]);
  message$ = new BehaviorSubject<{ type: any; text: string }>(null);

  // Form & Controls
  replyForm = new FormGroup({
    model: new FormControl('', Validators.required),
    modelVersionFrom: new FormControl('', Validators.required),
    modelVersionTo: new FormControl('', Validators.required),
    time: new FormControl('0'),
  });

  constructor(
    private dialogService: DialogService,
    private store: Store<HydroServingState>,
    private timemachineService: TimemachineService
  ) {
    const modelChanges$: Observable<Model> = this.replyForm.get('model')
      .valueChanges;
    const modelVersionFromChanges$: Observable<string> = this.replyForm.get(
      'modelVersionFrom'
    ).valueChanges;

    this.models$ = this.store.select(getModelsWithAtleastTwoModelVersions);
    this.modelVersions$ = modelChanges$.pipe(
      switchMap(model => this.store.select(getModelVersionsByModelId(model.id)))
    );
    this.secondModelVersions$ = combineLatest(
      this.modelVersions$,
      modelVersionFromChanges$
    ).pipe(
      map(([modelVersions, modelVersionFromId]) =>
        modelVersions.filter(mv => mv.id !== +modelVersionFromId)
      ),
      tap(modelVersions => {
        this.replyForm.get('modelVersionTo').setValue(modelVersions[0].id);
      })
    );
  }

  ngOnInit() {}

  close(): void {
    this.dialogService.closeDialog();
  }

  reply() {
    if (!this.replyForm.valid) {
      return;
    }

    this.message$.next(null);

    const values: {
      model: Model;
      modelVersionFrom: string;
      modelVersionTo: string;
    } = this.replyForm.value;

    this.timemachineService
      .travel({
        modelNameTo: values.model.name,
        modelVersionFrom: `${values.modelVersionFrom}`,
        versionTo: `${values.modelVersionTo}`,
        from: '0',
        till: '8559569823481000000',
      })
      .subscribe(
        response => {
          this.message$.next({
            type: 'success',
            text: `Reply successful started with id: ${response.id}`,
          });
        },
        err => {
          this.message$.next({
            type: 'error',
            text: err,
          });
        }
      );
  }
}
