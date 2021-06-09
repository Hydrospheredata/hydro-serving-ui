import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event, RouterEvent } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, map, tap, first } from 'rxjs/operators';

import { ZenModeService } from '@app/core/zenmode.service';
import { ModelsSidebarService } from './models-sidebar.service';
import { ModelsFacade } from '@app/core/facades/models.facade';

import { Model } from '@app/core/data/types/model';
import { IsRootUrlService } from '@app/core/is-root-url.service';

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

  private routerEvents$: Observable<Event>;
  private redirectToFirstEntity: Subscription;

  constructor(
    private modelsFacade: ModelsFacade,
    private router: Router,
    private zenMode: ZenModeService,
    private modelsSidebarService: ModelsSidebarService,
    private rootUrlService: IsRootUrlService,
  ) {
    this.visibleModels$ = this.modelsSidebarService.visibleModels();
    this.metricModelsAreHidden$ =
      this.modelsSidebarService.metricModelsAreHidden();

    this.routerEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
    this.isRootUrl$ = this.routerEvents$.pipe(
      map((event: RouterEvent) => this.rootUrlService.isRootUrl(event)),
    );

    this.redirectToFirstEntity = this.isRootUrl$
      .pipe(
        filter(isRoot => isRoot),
        tap(_ => this.redirectToFirst()),
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

  private redirectToFirst() {
    this.visibleModels$
      .pipe(first(models => models.length > 0))
      .subscribe(models => {
        this.router.navigate([`models/${models[0].name}`]);
      });
  }

  toggleHideMetricModels(hide: boolean) {
    this.modelsSidebarService.changeMetricModelsHide(hide);
  }
}
