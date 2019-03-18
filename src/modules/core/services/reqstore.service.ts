import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';

@Injectable()
export class ReqstoreService {
    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.reqstoreUrl}`;
    }

    public getData(from, to) {
        return this.http.getv2(`http://localhost:7265/app1stage0/get?from=${from}&to=${to}`, {
            responseType: 'arraybuffer',
        });
    }
}
