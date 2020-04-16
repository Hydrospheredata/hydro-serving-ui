import { Injectable } from '@angular/core';
import { Observable } from "@node_modules/rxjs";
import { Stat } from "../models/stat";
import { HttpService } from "@core/services/http";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatApiService {
  private readonly  baseUrl: string;
  constructor(private readonly http: HttpService) {
    this.baseUrl = `${environment.statUrl}`;
  }
  getStat(params: { model_name: string, model_version: number}): Observable<Stat> {
    return this.http.get(`${this.baseUrl}/metrics`, params)
  }
}
