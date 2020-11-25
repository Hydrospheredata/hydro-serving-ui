import { Component, Output, EventEmitter } from '@angular/core';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { ModelVersion } from '@app/core/data/types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddComparableComponent } from './add-comparable.component';
import { ModelVersionsTagsFacade } from './model-versions-tags.facade';

@Component({
  selector: 'hs-model-versions-tags',
  templateUrl: './model-versions-tags.component.html',
  styleUrls: ['./model-versions-tags.component.scss'],
  providers: [ModelVersionsTagsFacade],
})
export class ModelVersionsTagsComponent {
  @Output() listChanged: EventEmitter<ModelVersion[]> = new EventEmitter();
  modelVersions$: Observable<ModelVersion[]>;

  constructor(
    private facade: ModelVersionsTagsFacade,
    private dialog: DialogsService
  ) {
    this.modelVersions$ = this.facade.modelVersions$.pipe(
      tap(modelVersions => {
        this.listChanged.next(modelVersions);
      })
    );
  }
  add(): void {
    this.dialog.createDialog({
      component: AddComparableComponent,
      providers: [{ provide: ModelVersionsTagsFacade, useValue: this.facade }],
    });
  }
  remove(modelVersion: ModelVersion): void {
    this.facade.remove(modelVersion);
  }
}
