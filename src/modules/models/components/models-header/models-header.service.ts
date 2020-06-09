import { Injectable } from '@angular/core';
import { HydroServingState, selectRouterState } from '@core/store';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade, selectSelectedModelVersion } from '@models/store';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { Store, select } from '@node_modules/@ngrx/store';
import { Observable } from '@node_modules/rxjs';
import { map, first } from '@node_modules/rxjs/internal/operators';
import { Model, ModelVersion } from '@shared/models';
import { DialogDeleteModelComponent, SELECTED_MODEL } from '../dialogs';

@Injectable()
export class ModelsHeaderService {
  siblings$: Observable<ModelVersion[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<HydroServingState>,
    private readonly facade: ModelsFacade,
    private readonly dialog: DialogService
  ) {
    this.siblings$ = this.facade.siblingModelVersions$;
  }

  isButtonShowed(): Observable<boolean> {
    return this.store.pipe(
      select(selectRouterState),
      map(state => this.isRootUrl(state.state.url))
    );
  }

  getModel(): Observable<Model> {
    return this.facade.selectedModel$;
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.store.pipe(select(selectSelectedModelVersion));
  }

  getSiblings(): Observable<ModelVersion[]> {
    return this.facade.siblingModelVersions$;
  }

  getService(): Observable<string> {
    return this.store.pipe(
      select(selectRouterState),
      map(state => {
        const urlArray = state.state.url.split('/');
        const serviceIndexInArray = 4;

        if (urlArray[serviceIndexInArray]) {
          return urlArray[serviceIndexInArray].replace('_', ' ');
        } else {
          return undefined;
        }
      })
    );
  }

  onClickModel(): void {
    const [, root, modelId] = this.router.url.split('/');
    this.router.navigate([root, modelId]);
  }

  onClickModelVersion(): void {
    const [, root, modelId, modelVerId] = this.router.url.split('/');
    this.router.navigate([root, modelId, modelVerId]);
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
