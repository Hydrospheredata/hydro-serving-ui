import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DeploymentConfig } from '../data/types';
import {
  AddDeploymentConfig,
  DeleteDeploymentConfig,
  GetDeploymentConfigs,
  ToggleFavorite,
} from '../store/actions/deployment-configs.actions';
import { State } from '../store/states/deployment-configs.state';
import {
  selectAllConfigs,
  selectDefaultDeploymentConfig,
  selectDepConfigLoaded,
  selectSelectedDeploymentConfig,
} from '../store/selectors/deployment-configs.selectors';

@Injectable({ providedIn: 'root' })
export class DeploymentConfigsFacade {
  private readonly filterString = new BehaviorSubject('');
  private readonly filterString$ = this.filterString
    .asObservable()
    .pipe(debounceTime(300));

  private readonly all$: Observable<DeploymentConfig[]>;

  constructor(private readonly store: Store<State>) {
    this.all$ = store.pipe(select(selectAllConfigs));
  }

  allDepConfigs(): Observable<DeploymentConfig[]> {
    return this.store.pipe(select(selectAllConfigs));
  }

  getAll(): Observable<DeploymentConfig[]> {
    return this.all$;
  }

  filtered(): Observable<DeploymentConfig[]> {
    return combineLatest([this.filterString$, this.allDepConfigs()]).pipe(
      map(([filter, configs]) => {
        return filter
          ? configs.filter(({ name }) => name.includes(filter))
          : configs;
      }),
    );
  }

  nonFavoriteDepConfigs$ = this.filtered().pipe(
    map(configs => configs.filter(config => !config.favorite)),
  );

  favoriteDepConfigs$ = this.filtered().pipe(
    map(configs => configs.filter(config => config.favorite)),
  );

  visibleDepConfigs$: Observable<DeploymentConfig[]> = combineLatest(
    this.favoriteDepConfigs$,
    this.nonFavoriteDepConfigs$,
  ).pipe(map(([favorites, nonFavorites]) => [...favorites, ...nonFavorites]));

  selectedConfig(): Observable<DeploymentConfig> {
    return this.store.pipe(select(selectSelectedDeploymentConfig));
  }

  defaultDepConfig(): Observable<DeploymentConfig> {
    return this.store.pipe(select(selectDefaultDeploymentConfig));
  }

  loadAll(): void {
    this.store.dispatch(GetDeploymentConfigs());
  }

  delete(name: string): void {
    this.store.dispatch(DeleteDeploymentConfig({ name }));
  }

  add(config: DeploymentConfig) {
    this.store.dispatch(AddDeploymentConfig({ depConfig: config }));
  }

  onFilter(filter: string): void {
    this.filterString.next(filter);
  }

  areDepConfigsLoaded() {
    return this.store.pipe(select(selectDepConfigLoaded));
  }

  toggleFavorite(depConfig: DeploymentConfig) {
    this.store.dispatch(ToggleFavorite({ payload: { depConfig } }));
  }
}
