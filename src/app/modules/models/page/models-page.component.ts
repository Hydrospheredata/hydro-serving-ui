import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { ZenModeService } from '@app/core/zenmode.service';
import { ModelsSidebarService } from './models-sidebar.service';
import { ModelsFacade } from '@app/core/facades/models.facade';

import { Model } from '@app/core/data/types/model';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent implements OnDestroy, OnInit {
  visibleModels$: Observable<Model[]>;
  selectedModel$: Observable<Model> = this.modelsFacade.selectedModel();
  metricModelsAreHidden$: Observable<boolean>;

  private routerSub: Subscription;

  constructor(
    private modelsFacade: ModelsFacade,
    private router: Router,
    private zenMode: ZenModeService,
    private modelsSidebarService: ModelsSidebarService
  ) {
    this.visibleModels$ = this.modelsSidebarService.visibleModels();
    this.metricModelsAreHidden$ = this.modelsSidebarService.metricModelsAreHidden();

    this.routerSub = this.router.events
      .pipe(
        filter(event => ModelsPageComponent.isRootModelsUrl(event)),
        tap(_ => this.redirectToFirst())
      )
      .subscribe();
  }

  ngOnInit(): void {}

  get isZenMode$(): Observable<boolean> {
    return this.zenMode.isZenMode$;
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  handleFilter(str: string): void {
    this.modelsSidebarService.changeFilter(str);
  }

  handleToggleFavoriteModel(model: Model): void {
    this.modelsFacade.toggleFavorite(model);
  }

  handleSidebarClick(model: Model): void {
    this.router.navigate([`models/${model.id}`]);
  }

  private redirectToFirst() {
    this.visibleModels$
      .pipe(
        filter(models => models.length > 0),
        take(1)
      )
      .subscribe(models => {
        this.router.navigate([`models/${models[0].id}`]);
      });
  }

  private static isRootModelsUrl(event: Event): boolean {
    return event instanceof NavigationEnd && event.url.split('/').length <= 2;
  }

  toggleHideMetricModels(hide: boolean) {
    this.modelsSidebarService.changeMetricModelsHide(hide);
  }
}
