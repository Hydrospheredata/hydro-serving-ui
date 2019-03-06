import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ReqstoreService {
    private baseAPIUrl: string;

    constructor(
        private http: HttpClient
    ) {
    }

    public getData(from, to) {
        return this.http.get(`http://localhost:7265/app1stage0/get?from=${from}&to=${to}`, {
            observe: 'response',
            responseType: 'arraybuffer',
        });
    }
}
