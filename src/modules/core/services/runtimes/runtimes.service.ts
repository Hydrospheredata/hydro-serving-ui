
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@core/services/http/_index';



@Injectable()
export class RuntimesService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/runtime`;
    }

    public getRuntimes() {
        return this.http.get(`${this.baseAPIUrl}`).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public createRuntime(options) {
        return this.http.post(this.baseAPIUrl, options).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    // public getModelType(modelType: Model) {
    //     return this.http.post(this.baseAPIUrl, model);
    // }

}
