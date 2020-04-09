import { Injectable } from '@angular/core';
import { Observable, of } from "@node_modules/rxjs";
import { mockStat, Stat } from "../models/stat";

@Injectable({
  providedIn: 'root'
})
export class StatApiService {
  getStat(): Observable<Stat> {
    return of(mockStat)
  }
}
