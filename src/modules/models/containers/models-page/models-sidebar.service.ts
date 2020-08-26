import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Observable, BehaviorSubject, combineLatest } from '@node_modules/rxjs';
import { switchMap } from '@node_modules/rxjs/internal/operators';
import { map } from '@node_modules/rxjs/operators';
import { Model } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ModelsSidebarService {
  private readonly allModels$: Observable<Model[]>;
  private readonly nonMetricModels$: Observable<Model[]>;

  private _metricModelsAreHidden = new BehaviorSubject<boolean>(true);
  private _filterString = new BehaviorSubject('');

  constructor(private readonly facade: ModelsFacade) {
    this.allModels$ = facade.getAllModels();
    this.nonMetricModels$ = facade.getNonMetricModels();
  }

  metricModelsAreHidden(): Observable<boolean> {
    return this._metricModelsAreHidden.asObservable();
  }

  models(): Observable<Model[]> {
    return this.metricModelsAreHidden().pipe(
      switchMap(hidden => {
        return hidden ? this.nonMetricModels$ : this.allModels$;
      })
    );
  }

  filterString(): Observable<string> {
    return this._filterString.asObservable();
  }

  filteredModels(): Observable<Model[]> {
    return combineLatest([this.models(), this.filterString()]).pipe(
      map(([models, filterStr]) => {
        let filtered: Model[] = models;
        if (filterStr) {
          filtered = models.filter(model => model.name.includes(filterStr));
        }
        return filtered;
      })
    );
  }

  nonFavoriteModels(): Observable<Model[]> {
    return this.filteredModels().pipe(
      map(models => models.filter(model => !model.favorite))
    );
  }

  favoriteModels(): Observable<Model[]> {
    return this.filteredModels().pipe(
      map(models => models.filter(model => model.favorite))
    );
  }

  visibleModels(): Observable<Model[]> {
    return combineLatest([
      this.favoriteModels(),
      this.nonFavoriteModels(),
    ]).pipe(
      map(([fav, nonFav]) => {
        return [...fav, ...nonFav];
      })
    );
  }

  changeFilter(str: string): void {
    this._filterString.next(str);
  }

  changeMetricModelsHide(hide: boolean): void {
    this._metricModelsAreHidden.next(hide);
  }
}
