import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RuntimeType } from '@models/runtime-type';

@Injectable()
export class HttpRuntimeTypesService {

  private baseUrl: string;

  constructor(private http: Http) {
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
      let runtimeType = this.toRuntimeType(data[index]);
      runtimeTypes.push(runtimeType);
    }
    return runtimeTypes;
  }

  private toRuntimeType(data): RuntimeType {
    let runtimeType: RuntimeType;

    runtimeType = new RuntimeType({
      name: data['name'],
      version: data['version']
    });

    return runtimeType;
  }
}
