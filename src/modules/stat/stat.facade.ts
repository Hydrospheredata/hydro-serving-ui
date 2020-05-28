import { Injectable } from '@angular/core';
import { neitherNullNorUndefined } from '@shared/utils';
import { StatApiService } from './services/stat-api.service';
import { Observable, of } from '@node_modules/rxjs';
import { Stat } from './models';
import { ModelsFacade } from '@models/store';
import { switchMap, catchError } from '@node_modules/rxjs/internal/operators';
import { ModelVersion } from '@shared/models';
import { StatState } from './store/stat.state';

@Injectable()
export class StatFacade {
  private readonly modelVersion$: Observable<ModelVersion>;

  constructor(
    private statState: StatState,
    private statApi: StatApiService,
    private modelsFacade: ModelsFacade
  ) {
    this.modelVersion$ = this.modelsFacade.selectedModelVersion$;
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

  public loadingStat(): void {
    this.modelVersion$
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
