import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '@environments/environment';
import { Response } from '@angular/http';
import { RuntimeType } from '@shared/models/_index';
import { RuntimeTypeBuilder } from '@shared/builders/_index';
import { HttpService } from '@shared/services/http/_index';



@Injectable()
export class RuntimeTypesService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService,
        private runtimeTypeBuilder: RuntimeTypeBuilder
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/runtimeType`;
    }

    public getAll(): Observable<RuntimeType[]> {
        return this.http.get(this.baseAPIUrl).map((res: Response) => {
            return this.extractRuntimeTypes(res);
        });
    }

    public getRuntimeTypeByModelType(modelType: string): Observable<RuntimeType[]> {
        return this.http.get(`${this.baseAPIUrl}/modelType/${modelType}`)
            .map((res: Response) => {
                return this.extractRuntimeTypes(res);
            });
    }

    private extractRuntimeTypes(res: Response) {
        let data = res.json();
        let runtimeTypes: RuntimeType[] = [];
        for(let index in data) {
            let runtimeType = this.runtimeTypeBuilder.build(data[index]);
            runtimeTypes.push(runtimeType);
        }
        return runtimeTypes;
    }
}
