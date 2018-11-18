import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http/_index';
import { environment } from '@environments/environment';
import { of } from 'rxjs';

@Injectable()
export class EnvironmentsService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/environment`;
    }

    public getEnvironments() {
        return of([
            {
                id: 0,
                name: 'CPU',
                placeholders: [],
            },
            {
                id: 1,
                name: 'GPU',
                placeholders: [],
            },
        ]);
    }

    public deleteEnvironment(id: number) {
        return this.http.delete(`${this.baseAPIUrl}/${id}`);
    }
}
