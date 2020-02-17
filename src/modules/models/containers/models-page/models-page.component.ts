import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';
import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent implements OnDestroy {
  allModels$: Observable<Model[]> = this.modelsFacade.sortedModels$;
  selectedModel$: Observable<Model> = this.modelsFacade.selectedModel$;
  filterString: string = '';
  private routerSub: Subscription;

  constructor(private modelsFacade: ModelsFacade, private router: Router) {
    this.routerSub = this.router.events
      .pipe(
        filter(event => this.isRootModelsUrl(event)),
        tap(_ => this.redirectToFirst())
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
  handleFilter(str: string): void {
    this.modelsFacade.filterString$.next(str);
  }

  handleToggleFavoriteModel(model: Model): void {
    this.modelsFacade.toggleFavorite(model);
  }

  handleSidebarClick(model: Model): void {
    this.router.navigate([`models/${model.id}`]);
  }

  private redirectToFirst() {
    this.allModels$
      .pipe(
        filter(models => models.length > 0),
        take(1)
      )
      .subscribe(models => {
        this.router.navigate([`models/${models[0].id}`]);
      });
  }

  private isRootModelsUrl(event: Event): boolean {
    return event instanceof NavigationEnd && event.url.split('/').length <= 2;
  }
}
