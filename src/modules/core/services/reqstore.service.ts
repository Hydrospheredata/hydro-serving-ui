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
        return this.http.get(`${this.baseAPIUrl}`, {
            params: {
                from,
                to,
            },
        }).pipe(
            map((res: Response): any => res));
    }
}
