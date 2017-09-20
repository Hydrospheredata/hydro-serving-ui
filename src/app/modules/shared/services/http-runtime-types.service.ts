import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import {  Response } from '@angular/http';
import { RuntimeType } from '@shared/models/_index';
import { RuntimeTypeBuilder } from '@shared/builders/_index';
import { HttpService } from './http.service';

@Injectable()
export class HttpRuntimeTypesService {

  private baseAPIUrl: string;
  private baseUIUrl: string;

  constructor(
    private http: HttpService,
    private runtimeTypeBuilder: RuntimeTypeBuilder
  ) {
    this.baseAPIUrl = `${environment.apiUrl}/runtimeType`;
    this.baseUIUrl = `${environment.uiUrl}/runtimeType`;
  }

  public getAll(): Observable<RuntimeType[]> {
    return this.http.get(this.baseAPIUrl).map((res: Response) => {
      return this.extractRuntimeTypes(res);
    });
  }

  private extractRuntimeTypes(res: Response) {
    let data = res.json();
    let runtimeTypes :RuntimeType[] = [];
    for(let index in data) {
      let runtimeType = this.runtimeTypeBuilder.build(data[index]);
      runtimeTypes.push(runtimeType);
    }
    return runtimeTypes;
  }
}
