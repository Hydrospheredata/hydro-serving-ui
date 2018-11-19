
import { Injectable } from '@angular/core';

import { NewHttpService } from '@core/services/new_http/new_http.service';
import { environment } from '@environments/environment';
import { Application } from '@shared/models/_index';

import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class ApplicationsService {

    private baseApiUrl: string;

    constructor(
        private http: NewHttpService
    ) {
        this.baseApiUrl = `${environment.apiUrl}/applications`;
    }

    public getApplications(): Observable<Application[]> {
        return this.http.get(this.baseApiUrl).pipe(
            map((res: Response): any => res));
    }

    public updateApplication(application: Application): Observable<Application> {
        return this.http.put(this.baseApiUrl, application).pipe(
            map((res: Response): any => res));
    }

    public addApplication(application: Application) {
        return this.http.post(this.baseApiUrl, application).pipe(
            map((res: Response): any => res));
    }

    public generateInputs(id: number, signatureName: string) {
        return this.http.get(`${this.baseApiUrl}/generateInputs/${id}/${signatureName}`).pipe(
            map((res: Response): any => res));
    }

    public deleteApplication(id: number) {
        return this.http.delete(`${this.baseApiUrl}/${id}`);
    }

    public serveService(data, id, signatureName): Observable<any> {
        return this.http.post(`${this.baseApiUrl}/serve/${id}/${signatureName}`, data).pipe(
            map((res: Response): any =>  res));
    }
}
