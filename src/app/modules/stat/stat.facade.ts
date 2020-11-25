import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from '@node_modules/rxjs';

import { StatApiService } from './services/stat-api.service';
import { Stat } from './models';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { ModelVersion } from '@app/core/data/types';

import {
  switchMap,
  catchError,
  tap,
} from '@node_modules/rxjs/internal/operators';
import { StatState } from './store/stat.state';
import { neitherNullNorUndefined } from '@app/utils';

@Injectable()
export class StatFacade implements OnInit {
  private modelVersion$: Observable<ModelVersion>;

  constructor(
    private statState: StatState,
    private statApi: StatApiService,
    private modelVersionsFacade: ModelVersionsFacade
  ) {}

  ngOnInit() {
    this.modelVersion$ = this.modelVersionsFacade
      .selectedModelVersion()
      .pipe(neitherNullNorUndefined);
  }

  public getStat(): Observable<Stat> {
    return this.statState.getStat();
  }

  public isLoading(): Observable<boolean> {
    return this.statState.isLoading();
  }

  public getError(): Observable<string | null> {
    return this.statState.getError();
  }

  public getModelVersion(): Observable<ModelVersion> {
    return this.modelVersion$;
  }

  public loadStat(): void {
    this.modelVersionsFacade
      .selectedModelVersion()
      .pipe(
        switchMap(modelVersion => {
          this.statState.initLoading();
          return this.statApi
            .getStat({
              model_version_id: `${modelVersion.id}`,
            })
            .pipe(
              catchError(err => {
                this.statState.setError(err);
                return of(null);
              })
            );
        })
      )
      .subscribe(stat => {
        this.statState.setStat(stat);
      });
  }
}
