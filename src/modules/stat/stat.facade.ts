import { Injectable } from '@angular/core';
import { neitherNullNorUndefined } from '@shared/utils';
import { StatApiService } from './services/stat-api.service';
import { Observable } from '@node_modules/rxjs';
import { Stat } from './models';
import { ModelsFacade } from '@models/store';
import { switchMap, tap } from '@node_modules/rxjs/internal/operators';
import { ModelVersion } from '@shared/models';
import { StatState } from './store/stat.state';

@Injectable()
export class StatFacade {
  private readonly stat$: Observable<Stat>;
  private readonly modelVersion$: Observable<ModelVersion>;

  constructor(
    private statState: StatState,
    private statApi: StatApiService,
    private modelsFacade: ModelsFacade
  ) {
    this.modelVersion$ = this.modelsFacade.selectedModelVersion$;
  }

  public getStat(): Observable<Stat> {
    return this.statState.getStat().pipe(neitherNullNorUndefined);
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
        tap(() => this.statState.setLoading(true)),
        switchMap(modelVersion =>
          this.statApi.getStat({
            model_version_id: `${modelVersion.id}`,
          })
        )
      )
      .subscribe(
        stat => {
          this.statState.setStat(stat);
          this.statState.setLoading(false);
        },
        error => {
          this.statState.setLoading(false);
          this.statState.setError(error);
        }
      );
  }
}
