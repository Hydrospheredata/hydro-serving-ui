import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ZenModeService } from '@app/core/zenmode.service';
import { ModelsSidebarService } from './models-sidebar.service';
import { ModelsFacade } from '@app/core/facades/models.facade';

import { Model } from '@app/core/data/types/model';
import { RedirectService } from '@app/core/redirect.service';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent implements OnDestroy {
  visibleModels$: Observable<Model[]>;
  selectedModel$: Observable<Model> = this.modelsFacade.selectedModel();
  metricModelsAreHidden$: Observable<boolean>;
  isRootUrl$: Observable<boolean>;

  private redirectToFirstEntity: Subscription;

  constructor(
    private modelsFacade: ModelsFacade,
    private router: Router,
    private zenMode: ZenModeService,
    private modelsSidebarService: ModelsSidebarService,
    private redirectService: RedirectService,
  ) {
    this.visibleModels$ = this.modelsSidebarService.visibleModels();
    this.metricModelsAreHidden$ =
      this.modelsSidebarService.metricModelsAreHidden();
    this.isRootUrl$ = this.redirectService.isRootUrl$;

    this.redirectToFirstEntity = this.redirectService.isRootUrl$
      .pipe(
        filter(isRoot => isRoot),
        tap(_ =>
          this.redirectService.redirectToFirst(this.visibleModels$, 'models'),
        ),
      )
      .subscribe();
  }

  get isZenMode$(): Observable<boolean> {
    return this.zenMode.isZenMode$;
  }

  ngOnDestroy() {
    this.redirectToFirstEntity.unsubscribe();
  }

  handleFilter(str: string): void {
    this.modelsSidebarService.changeFilter(str);
  }

  handleToggleFavoriteModel(model: Model): void {
    this.modelsFacade.toggleFavorite(model);
  }

  handleSidebarClick(model: Model): void {
    this.router.navigate([`models/${model.name}`]);
  }

  toggleHideMetricModels(hide: boolean) {
    this.modelsSidebarService.changeMetricModelsHide(hide);
  }
}
