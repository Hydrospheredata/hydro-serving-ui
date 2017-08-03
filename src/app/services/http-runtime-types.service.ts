import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RuntimeType } from '@models/runtime-type';
import { RuntimeTypeBuilder } from '@builders/runtime-type.builder'

@Injectable()
export class HttpRuntimeTypesService {

  private baseUrl: string;

  constructor(
    private http: Http,
    private runtimeTypeBuilder: RuntimeTypeBuilder
  ) {
    this.baseUrl = `${environment.host}:${environment.port}/api/v1/runtimeType`
  }

  public getAll(): Observable<RuntimeType[]> {
    return this.http.get(this.baseUrl).map((res: Response) => {
      return this.extractRuntimeTypes(res) 
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
