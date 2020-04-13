import { Injectable } from '@angular/core';
import { StatApiService } from "./stat-api.service";
import { Observable } from "@node_modules/rxjs";
import { Stat } from "../models/stat";
import { ModelsFacade } from "@models/store";
import { switchMap } from "@node_modules/rxjs/internal/operators";

@Injectable()
export class StatService {
  stat$: Observable<Stat>;

  constructor(private statApi: StatApiService, private modelsFacade: ModelsFacade) {
    this.stat$ = this.modelsFacade.selectedModelVersion$
      .pipe(switchMap(modelVersion => this.statApi.getStat({
          model_name: modelVersion.model.name,
          model_version: modelVersion.id
        }))
      )
  }
}
