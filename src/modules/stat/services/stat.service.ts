import { Injectable } from '@angular/core';
import { StatApiService } from "./stat-api.service";
import { Observable } from "@node_modules/rxjs";
import { Stat } from "../models/stat";

@Injectable()
export class StatService {
  stat$: Observable<Stat>;
  constructor(private statApi: StatApiService) {
    this.stat$ = this.statApi.getStat();
  }
}
