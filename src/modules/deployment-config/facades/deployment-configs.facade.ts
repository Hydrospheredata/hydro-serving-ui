import { Injectable } from '@node_modules/@angular/core';
import { ActivatedRoute } from '@node_modules/@angular/router';
import { Store, select } from '@node_modules/@ngrx/store';
import { Observable, BehaviorSubject, combineLatest } from '@node_modules/rxjs';
import { map, debounceTime } from '@node_modules/rxjs/internal/operators';
import { DeploymentConfig } from '../models';
import { DeploymentConfigsApiService } from '../services/deployment-configs-api.service';
import {
  DeleteDeploymentConfig,
  State,
  selectAllConfigs,
  selectSelectedDeploymentConfig,
} from '../store';

@Injectable({ providedIn: 'root' })
export class DeploymentConfigsFacade {
  private filterString = new BehaviorSubject('');
  private filterString$ = this.filterString
    .asObservable()
    .pipe(debounceTime(300));
  private all$: Observable<DeploymentConfig[]>;

  constructor(
    private readonly api: DeploymentConfigsApiService,
    private readonly route: ActivatedRoute,
    private readonly store: Store<State>
  ) {
    this.all$ = store.pipe(select(selectAllConfigs));
  }

  all(): Observable<DeploymentConfig[]> {
    return this.all$;
  }

  filtered(): Observable<DeploymentConfig[]> {
    return combineLatest([this.filterString$, this.all()]).pipe(
      map(([filter, configs]) => {
        return filter
          ? configs.filter(({ name }) => name.includes(filter))
          : configs;
      })
    );
  }

  selectedConfig(): Observable<DeploymentConfig> {
    return this.store.pipe(select(selectSelectedDeploymentConfig));
  }

  delete(name: string): void {
    this.store.dispatch(DeleteDeploymentConfig({ name }));
  }

  onFilter(filter: string): void {
    this.filterString.next(filter);
  }
}
