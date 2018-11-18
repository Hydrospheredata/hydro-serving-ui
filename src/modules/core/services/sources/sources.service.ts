
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http/_index';
import { environment } from '@environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class SourcesService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelSource`;
    }

    public getSources() {
        return this.http.get(`${this.baseAPIUrl}`).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public addSource(options) {
        return this.http.post(`${this.baseAPIUrl}/${options.type}`, options.body).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

}
