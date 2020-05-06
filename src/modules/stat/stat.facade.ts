import { Injectable } from '@angular/core';
import { StatApiService } from './services/stat-api.service';
import { Observable } from '@node_modules/rxjs';
import { Stat } from './models';
import { ModelsFacade } from '@models/store';
import { switchMap } from '@node_modules/rxjs/internal/operators';
import { ModelVersion, Model } from '@shared/models';

@Injectable()
export class StatFacade {
  private readonly stat$: Observable<Stat>;
  private readonly modelVersion$: Observable<ModelVersion>;

  constructor(
    private statApi: StatApiService,
    private modelsFacade: ModelsFacade
  ) {
    this.modelVersion$ = this.modelsFacade.selectedModelVersion$;
    this.stat$ = this.modelsFacade.selectedModelVersion$.pipe(
      switchMap(modelVersion =>
        this.statApi.getStat({
          model_name: modelVersion.model.name,
          model_version_id: `${modelVersion.id}`,
        })
      )
    );
  }

  public getStat(): Observable<Stat> {
    return this.stat$;
  }

  public getModelVersion(): Observable<ModelVersion> {
    return this.modelVersion$;
  }
}
