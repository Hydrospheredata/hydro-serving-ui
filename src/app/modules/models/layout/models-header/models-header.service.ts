import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/internal/operators';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { Model, ModelVersion } from '@app/core/data/types';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { HydroServingState } from '@app/core/store/states/root.state';
import { selectRouterState } from '@app/core/store/selectors/router.selectors';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

import {
  DialogDeleteModelComponent,
  SELECTED_MODEL,
} from '@app/modules/dialogs/components';

@Injectable()
export class ModelsHeaderService {
  siblings$: Observable<ModelVersion[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<HydroServingState>,
    private readonly facade: ModelsFacade,
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly dialog: DialogsService
  ) {
    this.siblings$ = this.modelVersionsFacade.siblingModelVersions();
  }

  isButtonShowed(): Observable<boolean> {
    return this.store.pipe(
      select(selectRouterState),
      map(state => this.isRootUrl(state.state.url))
    );
  }

  getModel(): Observable<Model> {
    return this.facade.selectedModel();
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.modelVersionsFacade.selectedModelVersion();
  }

  getSiblings(): Observable<ModelVersion[]> {
    return this.modelVersionsFacade.siblingModelVersions();
  }

  getService(): Observable<string> {
    return this.store.pipe(
      select(selectRouterState),
      map(state => {
        const urlArray = state.state.url.split('/');
        const serviceIndexInArray = 4;
        return (
          urlArray[serviceIndexInArray] &&
          urlArray[serviceIndexInArray].replace('_', ' ').split('?')[0]
        );
      })
    );
  }

  onClickModel(): void {
    const [, root, modelId] = this.router.url.split('/');
    this.router.navigate([root, modelId]);
  }

  onClickModelVersion(): void {
    const [, root, modelId, modelVerId] = this.router.url.split('/');
    this.router.navigate([root, modelId, modelVerId], {
      queryParamsHandling: 'merge',
    });
  }

  onClickSibling(modelVersion: ModelVersion): void {
    const [, root, modelId, , ...tail] = this.router.url.split('/');
    this.router.navigate([root, modelId, modelVersion.id, ...tail]);
  }

  onDelete() {
    this.getModel()
      .pipe(first())
      .subscribe(model => {
        this.dialog.createDialog({
          component: DialogDeleteModelComponent,
          providers: [{ provide: SELECTED_MODEL, useValue: model }],
        });
      });
  }

  private isRootUrl(url: string): boolean {
    return url.split('/').length === 3;
  }
}
