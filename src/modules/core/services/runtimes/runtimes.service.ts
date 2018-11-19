
import { Injectable } from '@angular/core';
import { NewHttpService } from '@core/services/new_http/new_http.service';
import { environment } from '@environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class RuntimesService {

    private baseAPIUrl: string;

    constructor(
        private http: NewHttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/runtime`;
    }

    public getRuntimes() {
        return this.http.get(`${this.baseAPIUrl}`).pipe(
            map((res: Response): any => res));
    }

    public createRuntime(options) {
        return this.http.post(this.baseAPIUrl, options).pipe(
            map((res: Response): any => res));
    }
}
